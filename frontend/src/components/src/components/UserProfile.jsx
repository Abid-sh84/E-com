import { useState } from 'react';
 import { Button } from '@/components/ui/button';
 import { Input } from '@/components/ui/input';
 import { Label } from '@/components/ui/label';
 import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
 import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
 import { useToast } from '@/components/ui/use-toast';
 
 const UserProfile = () => {
   const { toast } = useToast();
   const [isEditing, setIsEditing] = useState(false);
   
   // Mock user data
   const [userData, setUserData] = useState({
     name: 'Peter Parker',
     email: 'peter.parker@example.com',
     phone: '+1 (234) 567-890',
     avatar: 'https://images.unsplash.com/photo-1531259683007-016a7b628fc3',
   });
   
   const handleUpdateProfile = (e) => {
     e.preventDefault();
     
     // Simulate saving profile
     toast({
       title: "Profile updated",
       description: "Your profile information has been saved successfully.",
     });
     
     setIsEditing(false);
   };
   
   const handleCancel = () => {
     setIsEditing(false);
     // Reset any changes
   };
 
   return (
     <div className="container mx-auto px-4 py-12">
       <h1 className="font-comic text-3xl md:text-4xl text-white mb-8">My Profile</h1>
       
       <div className="flex flex-col lg:flex-row gap-8">
         {/* Sidebar */}
         <div className="lg:w-1/4">
           <div className="bg-starrynight-blue/20 rounded-lg border border-starrynight-light/20 p-6">
             <div className="flex flex-col items-center">
               <Avatar className="w-32 h-32 border-4 border-superhero-yellow">
                 <AvatarImage src={userData.avatar} alt={userData.name} />
                 <AvatarFallback className="bg-starrynight-blue text-white text-2xl">
                   {userData.name.split(' ').map(n => n[0]).join('')}
                 </AvatarFallback>
               </Avatar>
               
               <h2 className="font-comic text-xl text-white mt-4">{userData.name}</h2>
               <p className="text-starrynight-light text-sm">{userData.email}</p>
               
               <div className="mt-6 w-full">
                 <Button 
                   className="w-full comic-btn"
                   onClick={() => setIsEditing(true)}
                 >
                   Edit Profile
                 </Button>
               </div>
             </div>
             
             <div className="mt-8 border-t border-starrynight-light/10 pt-6">
               <nav className="space-y-2">
                 <a 
                   href="#orders" 
                   className="flex items-center w-full p-3 rounded-md text-white hover:bg-starrynight-blue/50 transition"
                 >
                   My Orders
                 </a>
                 <a 
                   href="#wishlist" 
                   className="flex items-center w-full p-3 rounded-md text-white hover:bg-starrynight-blue/50 transition"
                 >
                   Wishlist
                 </a>
                 <a 
                   href="#addresses" 
                   className="flex items-center w-full p-3 rounded-md text-white hover:bg-starrynight-blue/50 transition"
                 >
                   Addresses
                 </a>
                 <a 
                   href="#settings" 
                   className="flex items-center w-full p-3 rounded-md text-white hover:bg-starrynight-blue/50 transition"
                 >
                   Settings
                 </a>
               </nav>
             </div>
           </div>
         </div>
         
         {/* Main Content */}
         <div className="lg:w-3/4">
           <div className="bg-starrynight-blue/20 rounded-lg border border-starrynight-light/20 p-6">
             <Tabs defaultValue="profile">
               <TabsList className="grid w-full grid-cols-3 mb-6">
                 <TabsTrigger value="profile">Profile</TabsTrigger>
                 <TabsTrigger value="orders">Orders</TabsTrigger>
                 <TabsTrigger value="addresses">Addresses</TabsTrigger>
               </TabsList>
               
               <TabsContent value="profile">
                 {isEditing ? (
                   <form onSubmit={handleUpdateProfile} className="space-y-6">
                     <div className="space-y-4">
                       <div>
                         <Label htmlFor="name">Full Name</Label>
                         <Input 
                           id="name"
                           defaultValue={userData.name}
                           className="bg-starrynight-blue/30 border-starrynight-light/30"
                         />
                       </div>
                       
                       <div>
                         <Label htmlFor="email">Email Address</Label>
                         <Input 
                           id="email"
                           type="email"
                           defaultValue={userData.email}
                           className="bg-starrynight-blue/30 border-starrynight-light/30"
                         />
                       </div>
                       
                       <div>
                         <Label htmlFor="phone">Phone Number</Label>
                         <Input 
                           id="phone"
                           defaultValue={userData.phone}
                           className="bg-starrynight-blue/30 border-starrynight-light/30"
                         />
                       </div>
                       
                       <div>
                         <Label htmlFor="avatar">Avatar URL</Label>
                         <Input 
                           id="avatar"
                           defaultValue={userData.avatar}
                           className="bg-starrynight-blue/30 border-starrynight-light/30"
                         />
                       </div>
                     </div>
                     
                     <div className="flex gap-4">
                       <Button type="submit" className="comic-btn">
                         Save Changes
                       </Button>
                       
                       <Button 
                         type="button" 
                         variant="outline"
                         className="border-starrynight-light text-white hover:bg-starrynight-light/10"
                         onClick={handleCancel}
                       >
                         Cancel
                       </Button>
                     </div>
                   </form>
                 ) : (
                   <div className="space-y-6">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div>
                         <h3 className="text-starrynight-light mb-1">Full Name</h3>
                         <p className="text-white">{userData.name}</p>
                       </div>
                       
                       <div>
                         <h3 className="text-starrynight-light mb-1">Email Address</h3>
                         <p className="text-white">{userData.email}</p>
                       </div>
                       
                       <div>
                         <h3 className="text-starrynight-light mb-1">Phone Number</h3>
                         <p className="text-white">{userData.phone}</p>
                       </div>
                       
                       <div>
                         <h3 className="text-starrynight-light mb-1">Member Since</h3>
                         <p className="text-white">June 15, 2023</p>
                       </div>
                     </div>
                     
                     <div className="pt-6 border-t border-starrynight-light/10">
                       <h3 className="font-comic text-xl text-white mb-4">Account Security</h3>
                       
                       <Button 
                         variant="outline"
                         className="border-starrynight-light text-white hover:bg-starrynight-light/10 mr-4"
                       >
                         Change Password
                       </Button>
                       
                       <Button 
                         variant="outline"
                         className="border-starrynight-light text-white hover:bg-starrynight-light/10"
                       >
                         Enable 2FA
                       </Button>
                     </div>
                   </div>
                 )}
               </TabsContent>
               
               <TabsContent value="orders">
                 <div className="text-center py-12">
                   <h3 className="font-comic text-2xl text-white mb-2">No Orders Yet</h3>
                   <p className="text-starrynight-light mb-6">
                     You haven't placed any orders yet. Start shopping to see your orders here.
                   </p>
                   <Button asChild className="comic-btn">
                     <a href="/products">Shop Now</a>
                   </Button>
                 </div>
               </TabsContent>
               
               <TabsContent value="addresses">
                 <div className="text-center py-12">
                   <h3 className="font-comic text-2xl text-white mb-2">No Addresses Saved</h3>
                   <p className="text-starrynight-light mb-6">
                     You haven't saved any shipping addresses yet.
                   </p>
                   <Button className="comic-btn">
                     Add New Address
                   </Button>
                 </div>
               </TabsContent>
             </Tabs>
           </div>
         </div>
       </div>
     </div>
   );
 };
 
 export default UserProfile;
