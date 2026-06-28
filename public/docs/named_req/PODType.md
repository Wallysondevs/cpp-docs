# Requisitos nomeados C++: PODType (obsoleto desde C++20)

Especifica que o tipo é um tipo POD (Plain Old Data). Isso significa que o tipo é compatível com os tipos usados na linguagem de programação C, ou seja, pode ser trocado com bibliotecas C diretamente, em sua forma binária.

Nota: o padrão não define um requisito nomeado com este nome. Esta é uma categoria de tipo definida pela linguagem central. É incluída aqui como um requisito nomeado apenas por consistência.

Este requisito de tipo é obsoleto no padrão C++. Todos os seus usos foram substituídos por requisitos de tipo mais refinados, como [TrivialType](<#/doc/named_req/TrivialType>), [ScalarType](<#/doc/named_req/ScalarType>), ou [StandardLayoutType](<#/doc/named_req/StandardLayoutType>). | (desde C++20)

### Requisitos

Os seguintes tipos são coletivamente chamados de _tipos POD_ :

  * [tipos escalares](<#/doc/named_req/ScalarType>)
  * [classes POD](<#/doc/language/classes>)
  * arrays de tais tipos
  * versões cv-qualified desses tipos

### Veja também

[ is_pod](<#/doc/types/is_pod>)(C++11)(obsoleto desde C++20) | verifica se um tipo é um tipo plain-old data (POD)
(class template)
[ is_scalar](<#/doc/types/is_scalar>)(C++11) | verifica se um tipo é um tipo escalar
(class template)
[ is_trivial](<#/doc/types/is_trivial>)(C++11)(obsoleto desde C++26) | verifica se um tipo é trivial
(class template)
[ is_standard_layout](<#/doc/types/is_standard_layout>)(C++11) | verifica se um tipo é um tipo [standard-layout](<#/doc/language/data_members>)
(class template)