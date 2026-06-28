# Extensões da biblioteca padrão C++, versão 2

A Versão 2 das Extensões C++ para Fundamentos da Biblioteca, ISO/IEC TS 19568:2017, define os seguintes novos componentes para a biblioteca padrão C++, além daqueles definidos na [versão 1](<#/doc/experimental/memory>):

### O idioma de detecção C++

Definido no header `[<experimental/type_traits>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/type_traits&action=edit&redlink=1> "cpp/header/experimental/type traits \(page does not exist\)")`
---
[ is_detected detected_t detected_or](<#/doc/experimental/is_detected>) | alias templates que detectam se um _template-id_ é bem-formado
(alias template)
[ nonesuch](<#/doc/experimental/nonesuch>) | tipo de classe retornado por detected_t em caso de falha
(class)

### Um wrapper de propagação de const para objetos tipo ponteiro

Definido no header `[<experimental/propagate_const>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/propagate_const&action=edit&redlink=1> "cpp/header/experimental/propagate const \(page does not exist\)")`
---
[ propagate_const](<#/doc/experimental/propagate_const>) | um wrapper de propagação de const para objetos tipo ponteiro
(class template)

### Ponteiros não proprietários

Definido no header `[<experimental/memory>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/memory&action=edit&redlink=1> "cpp/header/experimental/memory \(page does not exist\)")`
---
[ observer_ptr](<#/doc/experimental/observer_ptr>) | uma classe que representa um ponteiro não proprietário
(class template)

### Criação de `std::array`

Definido no header `[<experimental/array>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/array&action=edit&redlink=1> "cpp/header/experimental/array \(page does not exist\)")`
---
[ make_array](<#/doc/experimental/make_array>)(library fundamentals TS v2) | cria um objeto [std::array](<#/doc/container/array>) cujo tamanho e, opcionalmente, tipo de elemento são deduzidos dos argumentos
(function template)

### `ostream_joiner`

Definido no header `[<experimental/iterator>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/iterator&action=edit&redlink=1> "cpp/header/experimental/iterator \(page does not exist\)")`
---
[ ostream_joiner](<#/doc/experimental/ostream_joiner>) | um iterator de saída que escreve elementos sucessivos em um stream de saída, separando elementos adjacentes com um delimitador
(class template)

### Facilidades simples de geração de números aleatórios

Um _engine por thread_ do tipo [std::default_random_engine](<#/doc/numeric/random>), inicializado para um estado imprevisível, é mantido para cada thread e usado pelas funções abaixo.

Definido no header `[<experimental/random>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/random&action=edit&redlink=1> "cpp/header/experimental/random \(page does not exist\)")`
---
[ randint](<#/doc/experimental/randint>) | gera um inteiro aleatório no range especificado
(function template)
[ reseed](<#/doc/experimental/reseed>) | reinicializa o engine aleatório por thread
(function)
Definido no header `[<experimental/algorithm>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/algorithm&action=edit&redlink=1> "cpp/header/experimental/algorithm \(page does not exist\)")`

```cpp
 sample
(function template)
 shuffle
(function template)
```

### Macros de teste de funcionalidade

Definido no header `[<experimental/type_traits>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/type_traits&action=edit&redlink=1> "cpp/header/experimental/type traits \(page does not exist\)")`
---
__cpp_lib_experimental_logical_traits | um valor de pelo menos 201511 indica que os type traits de operadores lógicos são suportados
(macro constant)
__cpp_lib_experimental_detect | um valor de pelo menos 201505 indica que o idiom de detecção é suportado
(macro constant)
Definido no header `[<experimental/propagate_const>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/propagate_const&action=edit&redlink=1> "cpp/header/experimental/propagate const \(page does not exist\)")`

```cpp
__cpp_lib_experimental_propagate_const
(macro constant)
Definido no header `<experimental/functional>`
__cpp_lib_experimental_not_fn
(macro constant)
Definido no header `<experimental/memory>")`
__cpp_lib_experimental_observer_ptr
(macro constant)
Definido no header `<experimental/array>")`
__cpp_lib_experimental_make_array
(macro constant)
Definido no header `<experimental/iterator>")`
__cpp_lib_experimental_ostream_joiner
(macro constant)
Definido no header `<experimental/vector>")`
__cpp_lib_experimental_erase_if
(macro constant)
Definido no header `<experimental/numeric>")`
__cpp_lib_experimental_gcd_lcm
(macro constant)
Definido no header `<experimental/random>")`
__cpp_lib_experimental_randint
(macro constant)
Definido no header `<experimental/source_location>")`
__cpp_lib_experimental_source_location
(macro constant)
```

## Incorporado ao C++17

Os seguintes componentes dos fundamentos da biblioteca v2 foram adotados no padrão C++17.

Definido no header `[<experimental/type_traits>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/type_traits&action=edit&redlink=1> "cpp/header/experimental/type traits \(page does not exist\)")`
---
[ void_t](<#/doc/experimental/void_t>) | alias template variádico para `void`
(alias template)
Definido no header `[<experimental/type_traits>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/type_traits&action=edit&redlink=1> "cpp/header/experimental/type traits \(page does not exist\)")`

```cpp
 conjunction
(class template)
 disjunction
(class template)
 negation
(class template)
Definido no header `<experimental/functional>`
 not_fn
(function template)
Definido no header `<experimental/numeric>")`
 gcd
(function template)
 lcm
(function template)
```

## Incorporado ao C++20

Os seguintes componentes dos fundamentos da biblioteca v2 foram adotados no padrão C++20.

### Remoção uniforme de container

Definido no header `[<experimental/string>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/string&action=edit&redlink=1> "cpp/header/experimental/string \(page does not exist\)")`
---
[ erase (std::basic_string)](<#/doc/experimental/basic_string/erase>) | apaga todos os elementos iguais a um valor específico de um [std::basic_string](<#/doc/string/basic_string>)
(function template)
[ erase_if (std::basic_string)](<#/doc/experimental/basic_string/erase_if>) | apaga todos os elementos que satisfazem um predicado de um [std::basic_string](<#/doc/string/basic_string>)
(function template)
Definido no header `[<experimental/deque>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/deque&action=edit&redlink=1> "cpp/header/experimental/deque \(page does not exist\)")`

```cpp
 erase (std::deque)
(function template)
 erase_if (std::deque)
(function template)
Definido no header `<experimental/vector>")`
 erase (std::vector)
(function template)
 erase_if (std::vector)
(function template)
Definido no header `<experimental/forward_list>")`
 erase (std::forward_list)
(function template)
 erase_if (std::forward_list)
(function template)
Definido no header `<experimental/list>")`
 erase (std::list)
(function template)
 erase_if (std::list)
(function template)
Definido no header `<experimental/map>")`
 erase_if (std::map)
(function template)
 erase_if (std::multimap)
(function template)
Definido no header `<experimental/set>")`
 erase_if (std::set)
(function template)
 erase_if (std::multiset)
(function template)
Definido no header `<experimental/unordered_map>")`
 erase_if (std::unordered_map)
(function template)
 erase_if (std::unordered_multimap)
(function template)
Definido no header `<experimental/unordered_set>")`
 erase_if (std::unordered_set)
(function template)
 erase_if (std::unordered_multiset)
(function template)
```

### Captura de informações do código fonte

Definido no header `[<experimental/source_location>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/source_location&action=edit&redlink=1> "cpp/header/experimental/source location \(page does not exist\)")`
---
[ source_location](<#/doc/experimental/source_location>) | uma classe que representa informações sobre o código fonte, como nomes de arquivos, números de linha e nomes de funções
(class)

### Conversão de `std::array`

Definido no header `[<experimental/array>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/array&action=edit&redlink=1> "cpp/header/experimental/array \(page does not exist\)")`
---
[ to_array](<#/doc/experimental/to_array>) | cria um objeto [std::array](<#/doc/container/array>) a partir de um array embutido
(function template)