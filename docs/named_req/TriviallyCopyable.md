# Requisitos nomeados C++: TriviallyCopyable (desde C++11)

Nota: o padrão não define um requisito nomeado com este nome. Esta é uma categoria de tipo definida pela linguagem central. É incluída aqui como um requisito nomeado apenas por consistência.

### Requisitos

Os seguintes tipos são coletivamente chamados de _tipos trivialmente copiáveis_ :

  * [tipos escalares](<#/doc/named_req/ScalarType>)
  * [tipos de classe trivialmente copiáveis](<#/doc/language/classes>)
  * arrays de tais tipos
  * versões qualificadas por cv desses tipos

### Notas

Em geral, para qualquer tipo trivialmente copiável `T` e um objeto `obj1` de `T`, os bytes subjacentes de `obj1` podem ser copiados para um array de char, ou unsigned char, ou [`std::byte`](<#/doc/types/byte>)(desde C++17) ou para `obj2`, um objeto distinto de `T`. Nem `obj1` nem `obj2` podem ser um subobjeto potencialmente sobreposto.

Se os bytes subjacentes de `obj1` forem copiados para tal array, e então o conteúdo resultante for copiado de volta para `obj1`, `obj1` manterá seu valor original. Se os bytes subjacentes de `obj1` forem copiados para `obj2`, `obj2` manterá o valor de `obj1`.

Os bytes subjacentes podem ser copiados por [std::memcpy](<#/doc/string/byte/memcpy>) ou [std::memmove](<#/doc/string/byte/memmove>), desde que nenhum objeto volátil vivo seja acessado.

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto
---|---|---|---
[CWG 1734](<https://cplusplus.github.io/CWG/issues/1734.html>) | C++11  | POD C++03 com atribuição não-trivial deletada não era trivial  | construtores/operadores deletados permitidos
[CWG 2094](<https://cplusplus.github.io/CWG/issues/2094.html>) | C++11  | Tipos escalares voláteis não são trivialmente copiáveis ([CWG 1746](<https://cplusplus.github.io/CWG/issues/1746.html>))  | tornados trivialmente copiáveis

### Veja também

[ is_trivially_copyable](<#/doc/types/is_trivially_copyable>)(C++11) | verifica se um tipo é trivialmente copiável (modelo de classe)
  *[_(as is)_]: A::pointer