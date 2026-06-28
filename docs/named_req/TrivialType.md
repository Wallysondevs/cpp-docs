# Requisitos nomeados C++: TrivialType (desde C++11)(obsoleto em C++26)

Especifica que um tipo é um tipo trivial.

Nota: o padrão não define um requisito nomeado com este nome. Esta é uma categoria de tipo definida pela linguagem central. É incluído aqui como um requisito nomeado apenas para consistência.

### Requisitos

Os seguintes tipos são coletivamente chamados de _tipos triviais_ :

  * [tipos escalares](<#/doc/named_req/ScalarType>)
  * [tipos de classe triviais](<#/doc/language/classes>)
  * arrays de tais tipos
  * versões cv-qualificadas desses tipos

### Notas

Uma classe trivial pode ter um construtor padrão trivial privado ou protegido, caso em que uma tentativa de construir por padrão um objeto de tal classe em contextos não relacionados à classe torna o programa malformado.

### Ver também

[ is_trivial](<#/doc/types/is_trivial>)(C++11)(obsoleto em C++26) | verifica se um tipo é trivial
(modelo de classe)
  *[_(as is)_]: A::pointer