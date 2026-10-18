
"use client";

import { useState } from "react";

type Respuestas = {
  nombre: string;
  fechaNacimiento: string;
  telefono: string;
  correo: string;
  contactoEmergencia: string;
  motivoConsulta: string;
  sintomas: string;
  antecedentes: string;
  enfermedades: string;
  cirugias: string;
  alergias: string;
  medicamentos: string;
  suplementos: string;
  alimentacion: string;
  sueno: string;
  actividadFisica: string;
  observaciones: string;
  consentimiento: boolean;
};

const inicial: Respuestas = {
  nombre: "",
  fechaNacimiento: "",
  telefono: "",
  correo: "",
  contactoEmergencia: "",
  motivoConsulta: "",
  sintomas: "",
  antecedentes: "",
  enfermedades: "",
  cirugias: "",
  alergias: "",
  medicamentos: "",
  suplementos: "",
  alimentacion: "",
  sueno: "",
  actividadFisica: "",
  observaciones: "",
  consentimiento: false,
};

const secciones = [
  {
    titulo: "Tus datos personales",
    descripcion: "Comencemos con tus datos de identificación y contacto.",
    campos: [
      { key: "nombre", label: "Nombre completo", tipo: "text", requerido: true },
      { key: "fechaNacimiento", label: "Fecha de nacimiento", tipo: "date" },
      { key: "telefono", label: "Teléfono", tipo: "tel", requerido: true },
      { key: "correo", label: "Correo electrónico", tipo: "email" },
      { key: "contactoEmergencia", label: "Contacto de emergencia y teléfono", tipo: "text" },
    ],
  },
  {
    titulo: "Motivo de consulta",
    descripcion: "Cuéntanos qué te trae a consulta y qué te gustaría mejorar.",
    campos: [
      { key: "motivoConsulta", label: "¿Cuál es el motivo principal de tu consulta?", tipo: "textarea", requerido: true },
      { key: "sintomas", label: "¿Qué síntomas presentas y desde cuándo?", tipo: "textarea" },
      { key: "observaciones", label: "¿Hay algo más que consideres importante compartir?", tipo: "textarea" },
    ],
  },
  {
    titulo: "Antecedentes de salud",
    descripcion: "Esta información nos ayuda a conocer mejor tu historia clínica.",
    campos: [
      { key: "antecedentes", label: "Antecedentes familiares importantes", tipo: "textarea" },
      { key: "enfermedades", label: "Enfermedades, diagnósticos o padecimientos actuales", tipo: "textarea" },
      { key: "cirugias", label: "Cirugías, hospitalizaciones o accidentes importantes", tipo: "textarea" },
      { key: "alergias", label: "Alergias a medicamentos, alimentos u otras sustancias. Si no tienes, escribe “Ninguna conocida”.", tipo: "textarea", requerido: true },
    ],
  },
  {
    titulo: "Medicamentos y hábitos",
    descripcion: "Incluye los productos que utilizas actualmente.",
    campos: [
      { key: "medicamentos", label: "Medicamentos actuales, dosis y frecuencia", tipo: "textarea" },
      { key: "suplementos", label: "Vitaminas, suplementos u otros productos", tipo: "textarea" },
      { key: "alimentacion", label: "¿Cómo describirías tu alimentación habitual?", tipo: "textarea" },
      { key: "sueno", label: "¿Cómo duermes? ¿Cuántas horas por noche?", tipo: "textarea" },
      { key: "actividadFisica", label: "Actividad física habitual", tipo: "textarea" },
    ],
  },
];

export default function Home() {
  const [respuestas, setRespuestas] = useState<Respuestas>(inicial);
  const [paso, setPaso] = useState(0);
  const [revision, setRevision] = useState(false);
  const [guardado, setGuardado] = useState(false);

  function actualizar(key: string, value: string | boolean) {
    setRespuestas((anterior) => ({
      ...anterior,
      [key]: value,
    }));
  }

  function siguiente() {
    if (paso === 0 && (!respuestas.nombre.trim() || !respuestas.telefono.trim())) {
      alert("Por favor, completa tu nombre y teléfono.");
      return;
    }

    if (paso === 1 && !respuestas.motivoConsulta.trim()) {
      alert("Por favor, escribe el motivo principal de tu consulta.");
      return;
    }

    if (paso === 2 && !respuestas.alergias.trim()) {
      alert("Indica tus alergias o escribe “Ninguna conocida”.");
      return;
    }

    setPaso((actual) => Math.min(actual + 1, secciones.length));
  }

  function imprimir() {
    if (!respuestas.consentimiento) {
      alert("Necesitas confirmar la lectura del aviso de privacidad antes de continuar.");
      return;
    }

    window.print();
  }

  function nuevaAdmision() {
    setRespuestas(inicial);
    setPaso(0);
    setRevision(false);
    setGuardado(false);
  }

  const fecha = new Date().toLocaleDateString("es-MX", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-6 text-slate-900 sm:px-8">
      <style jsx global>{`
        @media print {
          body { background: white !important; }
          .no-imprimir { display: none !important; }
          .hoja-impresion {
            display: block !important;
            page-break-after: always;
            padding: 12mm;
          }
          .hoja-impresion:last-child { page-break-after: auto; }
          @page { size: A4; margin: 10mm; }
        }
      `}</style>

      <header className="no-imprimir mx-auto mb-6 max-w-3xl text-center">
        <p className="text-sm font-bold tracking-widest text-teal-700">
          CLÍNICA · ADMISIÓN
        </p>
        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
          Admisión y expediente clínico
        </h1>
        <p className="mt-3 text-slate-600">
          Tómate tu tiempo. Responde con la mayor claridad posible.
        </p>
      </header>

      {!revision ? (
        <section className="no-imprimir mx-auto max-w-3xl rounded-2xl bg-white p-5 shadow-sm sm:p-8">
          <div className="mb-6">
            <div className="mb-2 flex justify-between text-sm text-slate-500">
              <span>Paso {Math.min(paso + 1, secciones.length)} de {secciones.length}</span>
              <span>{Math.round(((paso + 1) / secciones.length) * 100)}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-teal-700 transition-all"
                style={{ width: `${((paso + 1) / secciones.length) * 100}%` }}
              />
            </div>
          </div>

          {paso < secciones.length ? (
            <>
              <h2 className="text-2xl font-bold">{secciones[paso].titulo}</h2>
              <p className="mb-6 mt-2 text-slate-600">{secciones[paso].descripcion}</p>

              <div className="space-y-5">
                {secciones[paso].campos.map((campo) => (
                  <label key={campo.key} className="block">
                    <span className="mb-2 block font-semibold">
                      {campo.label}
                      {"requerido" in campo && campo.requerido ? " *" : ""}
                    </span>

                    {campo.tipo === "textarea" ? (
                      <textarea
                        value={String(respuestas[campo.key as keyof Respuestas] ?? "")}
                        onChange={(e) => actualizar(campo.key, e.target.value)}
                        rows={4}
                        className="w-full rounded-xl border border-slate-300 p-4 text-lg outline-none focus:border-teal-700 focus:ring-2 focus:ring-teal-100"
                      />
                    ) : (
                      <input
                        type={campo.tipo}
                        required={"requerido" in campo && campo.requerido}
                        value={String(respuestas[campo.key as keyof Respuestas] ?? "")}
                        onChange={(e) => actualizar(campo.key, e.target.value)}
                        className="w-full rounded-xl border border-slate-300 p-4 text-lg outline-none focus:border-teal-700 focus:ring-2 focus:ring-teal-100"
                      />
                    )}
                  </label>
                ))}
              </div>

              <div className="mt-8 flex gap-3">
                {paso > 0 && (
                  <button
                    onClick={() => setPaso((actual) => actual - 1)}
                    className="min-h-14 flex-1 rounded-xl border border-slate-300 px-4 py-3 text-lg font-semibold"
                  >
                    Regresar
                  </button>
                )}
                <button
                  onClick={siguiente}
                  className="min-h-14 flex-1 rounded-xl bg-teal-700 px-4 py-3 text-lg font-bold text-white"
                >
                  {paso === secciones.length - 1 ? "Revisar respuestas" : "Continuar"}
                </button>
              </div>
            </>
          ) : (
            <div>
              <h2 className="text-2xl font-bold">Revisión y consentimiento</h2>
              <p className="mb-5 mt-2 text-slate-600">
                Revisa tus respuestas antes de finalizar.
              </p>
              <label className="flex items-start gap-3 rounded-xl border border-slate-200 p-4">
                <input
                  type="checkbox"
                  checked={respuestas.consentimiento}
                  onChange={(e) => actualizar("consentimiento", e.target.checked)}
                  className="mt-1 h-6 w-6"
                />
                <span>
                  Confirmo que proporcioné esta información de manera veraz y que
                  recibí el aviso de privacidad de la clínica. Entiendo que este
                  consentimiento no sustituye el consentimiento informado de cada
                  procedimiento.
                </span>
              </label>

              <button
                onClick={() => setRevision(true)}
                className="mt-5 min-h-14 w-full rounded-xl bg-teal-700 px-4 py-3 text-lg font-bold text-white"
              >
                Revisar expediente
              </button>
              <button
                onClick={() => setPaso(secciones.length - 1)}
                className="mt-3 w-full rounded-xl border border-slate-300 p-3 font-semibold"
              >
                Regresar a mis respuestas
              </button>
            </div>
          )}
        </section>
      ) : (
        <section className="no-imprimir mx-auto max-w-3xl rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold">Expediente listo para imprimir</h2>
          <p className="mt-2 text-slate-600">
            Paciente: {respuestas.nombre}
          </p>
          <p className="mt-1 text-slate-600">
            Antes de imprimir, confirma que los datos sean correctos.
          </p>
          <button
            onClick={imprimir}
            className="mt-6 min-h-14 w-full rounded-xl bg-teal-700 p-4 text-lg font-bold text-white"
          >
            Imprimir / Guardar como PDF
          </button>
          <button
            onClick={() => setRevision(false)}
            className="mt-3 w-full rounded-xl border border-slate-300 p-3 font-semibold"
          >
            Volver a editar
          </button>
        </section>
      )}

      <div className="hoja-impresion hidden">
        <h1 className="text-center text-2xl font-bold">EXPEDIENTE DE ADMISIÓN</h1>
        <p className="mt-2 text-center">Clínica en Medicina Molecular Aplicada</p>
        <p className="mt-2 text-right">Fecha: {fecha}</p>
        <h2 className="mt-6 border-b pb-2 text-lg font-bold">1. Datos personales</h2>
        <p className="mt-3"><b>Nombre:</b> {respuestas.nombre}</p>
        <p className="mt-2"><b>Fecha de nacimiento:</b> {respuestas.fechaNacimiento || "No especificada"}</p>
        <p className="mt-2"><b>Teléfono:</b> {respuestas.telefono}</p>
        <p className="mt-2"><b>Correo:</b> {respuestas.correo || "No especificado"}</p>
        <p className="mt-2"><b>Contacto de emergencia:</b> {respuestas.contactoEmergencia || "No especificado"}</p>
        <h2 className="mt-6 border-b pb-2 text-lg font-bold">2. Motivo de consulta</h2>
        <p className="mt-3 whitespace-pre-wrap"><b>Motivo:</b> {respuestas.motivoConsulta}</p>
        <p className="mt-3 whitespace-pre-wrap"><b>Síntomas y evolución:</b> {respuestas.sintomas || "No especificado"}</p>
        <p className="mt-3 whitespace-pre-wrap"><b>Observaciones:</b> {respuestas.observaciones || "No especificadas"}</p>
      </div>

      <div className="hoja-impresion hidden">
        <h2 className="text-xl font-bold">3. Antecedentes de salud</h2>
        <p className="mt-4 whitespace-pre-wrap"><b>Antecedentes familiares:</b>{"\n"}{respuestas.antecedentes || "No especificados"}</p>
        <p className="mt-5 whitespace-pre-wrap"><b>Enfermedades y diagnósticos:</b>{"\n"}{respuestas.enfermedades || "No especificados"}</p>
        <p className="mt-5 whitespace-pre-wrap"><b>Cirugías, hospitalizaciones y accidentes:</b>{"\n"}{respuestas.cirugias || "No especificados"}</p>
        <p className="mt-5 whitespace-pre-wrap"><b>Alergias:</b>{"\n"}{respuestas.alergias}</p>
      </div>

      <div className="hoja-impresion hidden">
        <h2 className="text-xl font-bold">4. Medicamentos y hábitos</h2>
        <p className="mt-4 whitespace-pre-wrap"><b>Medicamentos actuales:</b>{"\n"}{respuestas.medicamentos || "No especificados"}</p>
        <p className="mt-5 whitespace-pre-wrap"><b>Suplementos:</b>{"\n"}{respuestas.suplementos || "No especificados"}</p>
        <p className="mt-5 whitespace-pre-wrap"><b>Alimentación:</b>{"\n"}{respuestas.alimentacion || "No especificada"}</p>
        <p className="mt-5 whitespace-pre-wrap"><b>Sueño:</b>{"\n"}{respuestas.sueno || "No especificado"}</p>
        <p className="mt-5 whitespace-pre-wrap"><b>Actividad física:</b>{"\n"}{respuestas.actividadFisica || "No especificada"}</p>
        <p className="mt-10 border-t pt-3 text-sm">
          Firma del paciente: __________________________________
        </p>
      </div>

      <footer className="no-imprimir mx-auto mt-6 max-w-3xl text-center text-sm text-slate-500">
        Tus datos deben tratarse de manera confidencial y conforme al aviso de privacidad de la clínica.
      </footer>
    </main>
  );
}
