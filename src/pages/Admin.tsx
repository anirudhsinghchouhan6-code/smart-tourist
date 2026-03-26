import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Shield, ShieldCheck, Users, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

interface AdminUser {
  id: string;
  email: string;
  created_at: string;
  last_sign_in_at: string | null;
  profile: { full_name: string | null; phone: string | null } | null;
  roles: string[];
  persons: number;
}

export default function Admin() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [togglingRole, setTogglingRole] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !user) navigate("/auth");
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) fetchUsers();
  }, [user]);

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase.functions.invoke("admin-users", {
        body: null,
        headers: {},
      });

      if (error) throw error;
      if (data?.error === "Forbidden") {
        setIsAdmin(false);
        setLoading(false);
        return;
      }
      if (data?.error) throw new Error(data.error);

      setIsAdmin(true);
      setUsers(data.users || []);
    } catch (e: any) {
      if (e.message?.includes("403") || e.message?.includes("Forbidden")) {
        setIsAdmin(false);
      } else {
        toast({ title: "Error", description: e.message, variant: "destructive" });
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleRole = async (userId: string, role: string) => {
    setTogglingRole(`${userId}-${role}`);
    try {
      const { data, error } = await supabase.functions.invoke("admin-users?action=toggle-role", {
        body: { userId, role },
      });
      if (error || data?.error) throw new Error(data?.error || error?.message);
      toast({ title: "Role updated" });
      fetchUsers();
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    } finally {
      setTogglingRole(null);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 pb-16 container mx-auto px-4 text-center">
          <Shield className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
          <p className="text-muted-foreground mb-6">You don't have admin privileges.</p>
          <Button onClick={() => navigate("/")}>Go Home</Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-display font-bold">Admin Panel</h1>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <Users className="w-8 h-8 text-primary" />
                  <div>
                    <p className="text-2xl font-bold">{users.length}</p>
                    <p className="text-sm text-muted-foreground">Total Users</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-8 h-8 text-primary" />
                  <div>
                    <p className="text-2xl font-bold">
                      {users.filter((u) => u.roles.includes("admin")).length}
                    </p>
                    <p className="text-sm text-muted-foreground">Admins</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <Shield className="w-8 h-8 text-primary" />
                  <div>
                    <p className="text-2xl font-bold">
                      {users.filter((u) => u.roles.includes("moderator")).length}
                    </p>
                    <p className="text-sm text-muted-foreground">Moderators</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Users Table */}
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead>Last Sign In</TableHead>
                     <TableHead>Persons</TableHead>
                     <TableHead>Roles</TableHead>
                     <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((u) => (
                    <TableRow key={u.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">
                            {u.profile?.full_name || "No name"}
                          </p>
                          <p className="text-sm text-muted-foreground">{u.email}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">
                        {new Date(u.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-sm">
                        {u.last_sign_in_at
                          ? new Date(u.last_sign_in_at).toLocaleDateString()
                          : "Never"}
                      </TableCell>
                      <TableCell className="text-sm font-medium">
                        {u.persons}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1 flex-wrap">
                          {u.roles.filter((r) => r !== "user").length === 0 && (
                            <span className="text-sm text-muted-foreground">—</span>
                          )}
                          {u.roles.filter((r) => r !== "user").map((r) => (
                            <Badge
                              key={r}
                              variant={r === "admin" ? "default" : "secondary"}
                            >
                              {r}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1 flex-wrap">
                          {["admin", "moderator"].map((role) => {
                            const has = u.roles.includes(role);
                            const isToggling = togglingRole === `${u.id}-${role}`;
                            return (
                              <Button
                                key={role}
                                size="sm"
                                variant={has ? "default" : "outline"}
                                disabled={isToggling}
                                onClick={() => toggleRole(u.id, role)}
                                className="text-xs h-7"
                              >
                                {isToggling ? (
                                  <Loader2 className="w-3 h-3 animate-spin" />
                                ) : has ? (
                                  `Remove ${role}`
                                ) : (
                                  `Add ${role}`
                                )}
                              </Button>
                            );
                          })}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}
