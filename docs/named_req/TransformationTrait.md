# Requisitos nomeados C++: TransformationTrait (desde C++11)

Um **TransformationTrait** é um class template que fornece uma transformação de seu parâmetro de tipo template.

### Requisitos

  * Recebe um parâmetro de tipo template (parâmetros template adicionais são opcionais e permitidos).
  * O tipo transformado é um tipo aninhado publicamente acessível chamado type.

### Biblioteca padrão

Todos os [traits de transformação de tipo](<#/doc/meta>) satisfazem **TransformationTrait**.

Os seguintes class templates da biblioteca padrão também satisfazem **TransformationTrait**.

[ std::tuple_element<std::tuple>](<#/doc/utility/tuple/tuple_element>)(C++11) | obtém o tipo do elemento especificado
(especialização de class template)
[ std::tuple_element<std::pair>](<#/doc/utility/pair/tuple_element>)(C++11) | obtém o tipo dos elementos de `pair`
(especialização de class template)
[ std::tuple_element<std::array>](<#/doc/container/array/tuple_element>)(C++11) | obtém o tipo dos elementos de `array`
(especialização de class template)
[ variant_alternativevariant_alternative_t](<#/doc/utility/variant/variant_alternative>)(C++17) | obtém o tipo da alternativa especificada por seu índice, em tempo de compilação
(class template) (alias template)
  *[_(as is)_]: A::pointer