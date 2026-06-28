# Requisitos nomeados C++: UnaryTypeTrait (desde C++11)

Um **UnaryTypeTrait** é um template de classe que descreve uma propriedade do seu parâmetro de tipo template com uma especialização de [std::integral_constant](<#/doc/types/integral_constant>) (tipicamente [std::bool_constant](<#/doc/types/integral_constant>)).

### Requisitos

*   [DefaultConstructible](<#/doc/named_req/DefaultConstructible>) e [CopyConstructible](<#/doc/named_req/CopyConstructible>).
*   Recebe um parâmetro de tipo template (parâmetros template adicionais são opcionais e permitidos).
*   Derivado publicamente e de forma não ambígua de uma especialização de [std::integral_constant](<#/doc/types/integral_constant>), conhecido como sua _característica base_.
*   Os nomes dos membros da _característica base_ não estão ocultos e estão disponíveis de forma não ambígua.

### Biblioteca padrão

Os seguintes [type traits](<#/doc/meta>) todos satisfazem UnaryTypeTrait:

*   [Primary type categories](<#/doc/meta>)
*   [Composite type categories](<#/doc/meta>)
*   [Type properties](<#/doc/meta>)
*   [Supported operations](<#/doc/meta>)
*   [Property queries](<#/doc/meta>)

Os seguintes templates de classe da biblioteca padrão também satisfazem UnaryTypeTrait.

[ integral_constant](<#/doc/types/integral_constant>)(desde C++11) | constante em tempo de compilação de tipo especificado com valor especificado
---|---
(template de classe) |
[ negation](<#/doc/types/negation>)(desde C++17) | metafunção NOT lógica
(template de classe) |
[ std::tuple_size<std::tuple>](<#/doc/utility/tuple/tuple_size>)(desde C++11) | obtém o tamanho de uma `tuple`
(especialização de template de classe) |
[ std::tuple_size<std::array>](<#/doc/container/array/tuple_size>)(desde C++11) | obtém o tamanho de um `array`
(especialização de template de classe) |
[ std::tuple_size<std::pair>](<#/doc/utility/pair/tuple_size>)(desde C++11) | obtém o tamanho de um `pair`
(especialização de template de classe) |
[ variant_sizevariant_size_v](<#/doc/utility/variant/variant_size>)(desde C++17) | obtém o tamanho da lista de alternativas da `variant` em tempo de compilação
(template de classe) (template de variável) |
[ is_bind_expression](<#/doc/utility/functional/is_bind_expression>)(desde C++11) | indica que um objeto é uma expressão `std::bind` ou pode ser usado como tal
(template de classe) |
[ is_placeholder](<#/doc/utility/functional/is_placeholder>)(desde C++11) | indica que um objeto é um placeholder padrão ou pode ser usado como tal
(template de classe) |
[ is_execution_policy](<#/doc/algorithm/is_execution_policy>)(desde C++17) | testa se uma classe representa uma política de execução
(template de classe)