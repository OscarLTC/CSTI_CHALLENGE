import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { LuPlus, LuSave, LuTrash2 } from "react-icons/lu";
import { useNavigate } from "react-router";

export const RequestForm = () => {
  const navigate = useNavigate();

  const [contacts, setContacts] = useState([
    {
      name: "",
      phone: "",
    },
  ]);

  const onAddContact = () => {
    setContacts([...contacts, { name: "", phone: "" }]);
  };

  return (
    <form className="grid grid-cols-3 md:grid-cols-6 gap-4 max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
      <div className="col-span-3">
        <label
          htmlFor="requestBrand"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          Marca
        </label>
        <InputText
          className="w-full border p-2 rounded h-11 text-sm"
          id="requestBrand"
          placeholder="Ingrese la marca de la solicitud"
        />
      </div>
      <div className="col-span-3">
        <label
          htmlFor="requesType"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          Tipo de Solicitud
        </label>
        <InputText
          placeholder="Ingrese el tipo de solicitud"
          className="w-full border p-2 rounded h-11 text-sm"
        />
      </div>
      <div className="col-span-3">
        <label
          htmlFor="requesType"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          Fecha de Envío
        </label>
        <Calendar
          className="w-full border p-2 rounded h-11 text-sm "
          id="requestDate"
          placeholder="Seleccione la fecha de envío"
          dateFormat="mm/dd/yy"
          showIcon
        />
      </div>
      <div className="col-span-3">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Número de Teléfono
        </label>
        <InputText
          className="w-full border p-2 rounded h-11 text-sm"
          placeholder="Ingrese el número de teléfono"
          id="contactPhone"
        />
      </div>
      <div className="col-span-6">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Nombre de Contacto
        </label>
        <InputText
          className="w-full border p-2 rounded h-11 text-sm"
          placeholder="Ingrese el nombre de contacto"
          id="contactName"
        />
      </div>

      <div className="col-span-6 mt-4">
        <div className="flex w-full justify-between items-center mb-4">
          <h2 className="text-xl font-medium">Contactos Adicionales</h2>
          <Button
            type="button"
            label="Agregar Contacto"
            className="flex gap-2 px-4 py-2 border text-sm "
            icon={<LuPlus className="w-5 h-5" />}
            onClick={onAddContact}
          />
        </div>
        {contacts.map((contact, index) => (
          <div key={index} className="flex justify-between space-x-4 mb-4">
            <div className="flex-1">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Nombre{" "}
              </label>
              <InputText
                className="border p-2 rounded h-11 text-sm w-full"
                placeholder="Nombre del contacto"
                value={contact.name}
                onChange={(e) => {
                  const newContacts = [...contacts];
                  newContacts[index].name = e.target.value;
                  setContacts(newContacts);
                }}
              />
            </div>
            <div className="flex-1">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Teléfono
              </label>
              <InputText
                className="border p-2 rounded h-11 text-sm w-full"
                placeholder="Teléfono del contacto"
                value={contact.phone}
                onChange={(e) => {
                  const newContacts = [...contacts];
                  newContacts[index].phone = e.target.value;
                  setContacts(newContacts);
                }}
              />
            </div>
            <Button
              type="button"
              className="flex border  bg-red-500 self-end w-11 h-11"
              icon={<LuTrash2 className=" text-white" />}
              onClick={() => {
                const newContacts = contacts.filter((_, i) => i !== index);
                setContacts(newContacts);
              }}
            />
          </div>
        ))}
      </div>

      <div className="col-span-6 flex justify-end gap-4 mt-6">
        <Button
          type="button"
          label="Cancelar"
          className="ml-2 px-6 py-2 border text-sm"
          onClick={() => navigate("/requests")}
        />
        <Button
          type="submit"
          label="Guardar"
          icon={<LuSave className="w-5 h-5" />}
          className="px-6 py-2 bg-black text-white text-sm flex items-center gap-2"
        />
      </div>
    </form>
  );
};
