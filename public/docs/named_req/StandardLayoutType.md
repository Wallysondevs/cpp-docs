# Requisitos nomeados C++: StandardLayoutType (desde C++11)

Especifica que um tipo é um tipo standard layout. Tipos standard layout são úteis para comunicação com código escrito em outras linguagens de programação.

Nota: o padrão não define um requisito nomeado com este nome. Esta é uma categoria de tipo definida pela linguagem central. É incluído aqui como um requisito nomeado apenas por consistência.

### Requisitos

Os seguintes tipos são coletivamente chamados de _tipos standard layout_ :

  * [tipos escalares](<#/doc/named_req/ScalarType>)
  * [tipos de classe standard layout](<#/doc/language/classes>)
  * arrays de tais tipos
  * versões cv-qualified desses tipos

### Propriedades

Veja [Standard-layout](<#/doc/language/data_members>).

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto
[CWG 1672](<https://cplusplus.github.io/CWG/issues/1672.html>) | C++11  | regra do primeiro membro de dados não estático ignorada  
existência de classes base vazias  | regra do primeiro membro de dados não estático  
tornada recursiva   
[CWG 1813](<https://cplusplus.github.io/CWG/issues/1813.html>) | C++11  | classe com um membro definido em uma base indireta  
não era tecnicamente standard-layout  | todas as declarações de membros devem estar  
na mesma classe   
[CWG 2120](<https://cplusplus.github.io/CWG/issues/2120.html>) | C++11  | array como primeiro membro não era considerado ao  
comparar o tipo do primeiro elemento com o tipo de uma base  | membros array são considerados   

### Veja também

[ is_standard_layout](<#/doc/types/is_standard_layout>)(C++11) | verifica se um tipo é um tipo [standard-layout](<#/doc/language/data_members>)   
(class template)  
*[_(as is)_]: A::pointer