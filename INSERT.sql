alter table home 
   add constraint check_type (type_product in ('P','MV'));

INSERT INTO 
  home 
  ( id,	type_product, product_id ) VALUES
  ( 1, 'P', 1),
  ( 2, 'P', 3),
  ( 3, 'P', 16),
  ( 4, 'MV', 13),
  ( 5, 'MV', 17),
  ( 6, 'MV', 24);

INSERT INTO 
  category 
  ( id,	name, url_photo ) VALUES
  ( 1, 'Bebidas', 'https://firebasestorage.googleapis.com/v0/b/marketless-62365.appspot.com/o/Categorias%2FBEBIDAS.svg?alt=media&token=2f49d318-0d47-425d-840f-926110403a0f'),
  ( 2, 'Geladeira', 'https://firebasestorage.googleapis.com/v0/b/marketless-62365.appspot.com/o/Categorias%2FGELADEIRA.svg?alt=media&token=1027ea51-1bf5-425f-988c-b0549ec515a8'),
  ( 3, 'Carnes', 'https://firebasestorage.googleapis.com/v0/b/marketless-62365.appspot.com/o/Categorias%2FCARNES_AVES.svg?alt=media&token=b15691ce-caad-43a2-a500-c41f944e03fe'),
  ( 4, 'Despensa', 'https://firebasestorage.googleapis.com/v0/b/marketless-62365.appspot.com/o/Categorias%2FDESPENSA.svg?alt=media&token=a4c36808-0f22-4c0a-ae27-d1c6c6448cf2'),
  ( 5, 'Higiene', 'https://firebasestorage.googleapis.com/v0/b/marketless-62365.appspot.com/o/Categorias%2FHIGIENE.svg?alt=media&token=b6251d7e-338a-429f-b26a-0630c8e674b2'),
  ( 6, 'Hortifruti', 'https://firebasestorage.googleapis.com/v0/b/marketless-62365.appspot.com/o/Categorias%2FHORTIFRUTI.svg?alt=media&token=0345905d-e248-4cf3-875c-0f9734c9399d'),
  ( 7, 'Limpeza', 'https://firebasestorage.googleapis.com/v0/b/marketless-62365.appspot.com/o/Categorias%2FLIMPEZA.svg?alt=media&token=9c4f4463-1787-4f75-8579-ea4ebaef024c'),
  ( 8, 'Padaria', 'https://firebasestorage.googleapis.com/v0/b/marketless-62365.appspot.com/o/Categorias%2FPADARIA.svg?alt=media&token=36f051de-e529-4891-bb5d-a345319cc34c');

( 1, 'HEINEKEN', 'Cerveja', 9.9, 'photo'),

INSERT INTO 
  product 
  ( id,	name,	description, price, url_photo ) VALUES
  ( 1, 'Arroz SUPER MÁXIMO 5KG', 'ARROZ PARBOILIZADO SUPER MÁXIMO PCT 5KG', 26.99, 'https://firebasestorage.googleapis.com/v0/b/marketless-62365.appspot.com/o/Arroz%2FArroz_M%C3%A1ximo.png?alt=media&token=c0325950-71f3-4a0a-9b6b-004ff05ff4ed'),
  ( 2, 'Arroz CAMIL 5kg', 'Arroz CAMIL PCT 5kg', 25.99, 'https://firebasestorage.googleapis.com/v0/b/marketless-62365.appspot.com/o/Arroz%2FArroz%20Camil.jpg?alt=media&token=b50f33c0-a2e1-4256-b793-20075fbfb50f'),
  ( 3, 'Arroz PRATO FINO 5kg', 'Arroz PRATO FINO PCT 5kg', 29.99, 'https://firebasestorage.googleapis.com/v0/b/marketless-62365.appspot.com/o/Arroz%2FArroz_Prato_Fino.png?alt=media&token=dba783d7-de33-45bd-b03d-500778c54b33'),
  ( 4, 'Arroz TIO JOÃO 5kg', 'Arroz TIO JOÃO Pacote 5kg', 29.99, 'https://firebasestorage.googleapis.com/v0/b/marketless-62365.appspot.com/o/Arroz%2FArroz_Tio_J%C3%B5ao.png?alt=media&token=2488122e-d909-4f82-b59e-2b8af58d9a19'),
  ( 5, 'Arroz URBANO 1Kg', 'Arroz URBANO Vitaminado 1Kg', 5.99, 'https://firebasestorage.googleapis.com/v0/b/marketless-62365.appspot.com/o/Arroz%2FArroz_Urbano_Vitaminado.png?alt=media&token=d29b23a1-5d6e-4534-bfe3-09e407c841e9'),
  ( 6, 'Feijão Carioca QUALITÁ 1Kg', 'Feijão Carioca QUALITÁ Pacote 1Kg', 6.59, 'https://firebasestorage.googleapis.com/v0/b/marketless-62365.appspot.com/o/Feijao%2FFeij%C3%A3o_Qualita.png?alt=media&token=5cc911ad-1a62-43b5-9924-58192e0a3189'),
  ( 7, 'Feijão Carioca CAMIL 1kg', 'Feijão Carioca CAMIL Pacote 1kg', 7.59, 'https://firebasestorage.googleapis.com/v0/b/marketless-62365.appspot.com/o/Feijao%2FFeij%C3%A3o_Camil.png?alt=media&token=41db542f-fb96-4441-87b8-2c76dcfa581d'),
  ( 8, 'Feijão Carioca KICALDO 1Kg', 'Feijão Carioca KICALDO Pacote 1Kg', 7.69, 'https://firebasestorage.googleapis.com/v0/b/marketless-62365.appspot.com/o/Feijao%2FKicaldo_Feijao.png?alt=media&token=f8d2bb19-f0c3-4423-82a9-96c621641e15'),
  ( 9, 'Feijão Preto SUPRE MÁXIMO 1kg', 'Feijão Preto SUPRE MÁXIMO Pacote 1kg', 9.98, 'https://firebasestorage.googleapis.com/v0/b/marketless-62365.appspot.com/o/Feijao%2FFeijao_Preto_Super_Maximo.png?alt=media&token=00189e52-ecdb-434b-8a08-5ea34e5c34a6'),
  ( 10, 'Feijão Preto QUALITÁ 1kg ', 'Feijão Preto QUALITÁ Pacote 1kg ', 7.59, 'https://firebasestorage.googleapis.com/v0/b/marketless-62365.appspot.com/o/Feijao%2FFeij%C3%A3o_Preto_Qualita.png?alt=media&token=852c3e70-1083-489d-8bae-89302f4290e9'),
  ( 11, 'Cereal SNOW FLAKES 620g', 'Cereal Matinal SNOW FLAKES 620g', 16.79, 'https://firebasestorage.googleapis.com/v0/b/marketless-62365.appspot.com/o/Cereais%2FSnow_Flakes.png?alt=media&token=49e195b9-a3c9-4df2-8362-711d8d6432a8'),
  ( 12, 'Cereal NESTLÉ 770g', 'Cereal Matinal Nescau NESTLÉ 770g', 18.99, 'https://firebasestorage.googleapis.com/v0/b/marketless-62365.appspot.com/o/Cereais%2FNescau_Cereal.png?alt=media&token=4e562aa9-221d-4d51-9def-6a8a8506368a'),
  ( 13, 'Cereal POWER POPS CHOCOLATE 660G', 'Cereal Matinal SUCRILHOS POWER POPS CHOCOLATE 660G', 25.79, 'https://firebasestorage.googleapis.com/v0/b/marketless-62365.appspot.com/o/Cereais%2FSucrilhos_POWEPOPS.png?alt=media&token=6c4faada-ad3c-49e6-9713-80e4dced453f'),
  ( 14, 'Cereal KELLOGGS 730g', 'Cereal Matinal Sucrilhos KELLOGGS Caixa 730g', 22.29, 'https://firebasestorage.googleapis.com/v0/b/marketless-62365.appspot.com/o/Cereais%2FSucrilhos_KELLOGGS.png?alt=media&token=c2e73e0c-d49a-4331-a68f-9e3a6fabedec'),
  ( 15, 'Cereal Grain Flakes JASMINE 1kg', 'Cereal Matinal Tradicional Grain Flakes JASMINE Pacote 1kg', 24.49, 'https://firebasestorage.googleapis.com/v0/b/marketless-62365.appspot.com/o/Cereais%2FJasmine_GrainFlakes.jpg?alt=media&token=807716d9-6e64-4bdb-b6d2-d40c19d73a2b'),

