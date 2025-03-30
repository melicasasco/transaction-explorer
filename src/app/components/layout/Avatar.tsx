"use client";
import Image from "next/image";
import { useResponsive, DESKTOP_BREAKPOINT } from "../../hooks/useResponsive";
import { Button } from "@/app/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { useState } from "react";
import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";


export const Avatar = () => {
  const isDesktop = useResponsive({ breakpoint: DESKTOP_BREAKPOINT });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  

  return (
    <>
      {isDesktop && (
        <div className="bg-[#E7EEFF80] h-20 flex items-center p-4">
          <Button
            onClick={() => setIsDialogOpen(true)}
            variant="link"
            className="no-underline"
          >
            { <Image
              src="/fotomel.png"
              alt="avatar"
              width={82}
              height={82}
              className="w-12 h-12 rounded-full cursor-pointer"
            />}
          </Button>
          <span className="font-bold text-[#3A3A3A] no-underline">
            meli
          </span>
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          {/* <Button variant="outline">Edit Profile</Button> */}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Sobre mí</DialogTitle>
            <DialogDescription>
              Me llamo Meli. Soy de Buenos Aires. Fanática de los gatos,
              Islandia, y el chocolate.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value="Meli"
                className="col-span-3"
                onChange={(e) => {
                  console.log(e.target.value);
                }}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4 ">
              <Label htmlFor="username" className="text-right">
                Last name
              </Label>
              <Input
                id="username"
                value="Casasco"
                className="col-span-3"
                onChange={(e) => {
                  console.log(e.target.value);
                }}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              className="bg-[#022A9A] rounded-full"
              onClick={() => setIsDialogOpen(false)}
              type="submit"
            >
              Salir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
