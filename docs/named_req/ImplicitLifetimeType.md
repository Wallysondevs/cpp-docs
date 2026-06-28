# Requisitos nomeados C++: ImplicitLifetimeType

Nota: o padrão não define um requisito nomeado com este nome. Esta é uma categoria de tipo definida pela linguagem central. É incluído aqui como um requisito nomeado apenas por consistência.

### Requisitos

Os seguintes tipos são coletivamente chamados de _tipos de tempo de vida implícito_:

*   [tipos escalares](<#/doc/named_req/ScalarType>)
*   [tipos de classe de tempo de vida implícito](<#/doc/language/classes>)
*   tipos array
*   versões cv-qualificadas desses tipos

### Notas

Certas operações podem [criar implicitamente](<#/doc/language/objects>) e iniciar o [tempo de vida](<#/doc/language/lifetime>) de objetos de tipos de tempo de vida implícito, se isso impedisse [comportamento indefinido](<#/doc/language/ub>). No entanto, tais operações não iniciam os tempos de vida de subobjetos de tais objetos que não são eles próprios de tipos de tempo de vida implícito.

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[CWG 2489](<https://cplusplus.github.io/CWG/issues/2489.html>) | C++20 | uma operação que inicia o tempo de vida de um array de char cria objetos implicitamente | não o faz
*[_(as is)_]: A::pointer