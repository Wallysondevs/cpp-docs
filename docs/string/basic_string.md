# std::basic_string

Definido no cabeçalho `[<string>](<#/doc/header/string>)`

```c
template<
class CharT,
class Traits = std::char_traits<CharT>,
class Allocator = std::allocator<CharT>
> class basic_string;
namespace pmr {
template<
class CharT,
class Traits = std::char_traits<CharT>
> using basic_string =
std::basic_string<CharT, Traits, std::pmr::polymorphic_allocator<CharT>>;
}
```

O template de classe `basic_string` armazena e manipula sequências de objetos semelhantes a [caracteres](<#/doc/language/types>), que são objetos não-array de [TrivialType](<#/doc/named_req/TrivialType>) e [StandardLayoutType](<#/doc/named_req/StandardLayoutType>). A classe não depende nem do tipo de caractere nem da natureza das operações sobre esse tipo. As definições das operações são fornecidas através do parâmetro de template `Traits` - uma especialização de [std::char_traits](<#/doc/string/char_traits>) ou uma classe traits compatível.

Os elementos de uma `basic_string` são armazenados contiguamente, ou seja, para uma `basic_string` s, &*(s.begin() + n) == &*s.begin() + n para qualquer n em `[`​0​`, `s.size()`)`, e *(s.begin() + s.size()) tem o valor CharT() (um terminador nulo)(desde C++11); ou, equivalentemente, um ponteiro para s[0] pode ser passado para funções que esperam um ponteiro para o primeiro elemento de um array(até C++11)um array terminado em nulo(desde C++11) de `CharT`.

`std::basic_string` satisfaz os requisitos de [AllocatorAwareContainer](<#/doc/named_req/AllocatorAwareContainer>) (exceto que `construct`/`destroy` customizados não são usados para construção/destruição de elementos), [SequenceContainer](<#/doc/named_req/SequenceContainer>) e [ContiguousContainer](<#/doc/named_req/ContiguousContainer>)(desde C++17).

Se qualquer um de `Traits::char_type` e `Allocator::char_type` for diferente de `CharT`, o programa é malformado.

```cpp
As funções membro de `std::basic_string` são constexpr: é possível criar e usar objetos `std::string` na avaliação de uma expressão constante. No entanto, objetos `std::string` geralmente não podem ser constexpr, porque qualquer armazenamento alocado dinamicamente deve ser liberado na mesma avaliação da expressão constante.  // (desde C++20)
```

Vários typedefs para tipos de caracteres comuns são fornecidos:

Definido no cabeçalho `[<string>](<#/doc/header/string>)`
---
Tipo | Definição
---|---
`std::string` | std::basic_string&lt;char&gt;
`std::wstring` | std::basic_string<wchar_t>
`std::u8string` (C++20) | std::basic_string<char8_t>
`std::u16string` (C++11) | std::basic_string<char16_t>
`std::u32string` (C++11) | std::basic_string<char32_t>
`std::pmr::string` (C++17) | std::pmr::basic_string&lt;char&gt;
`std::pmr::wstring` (C++17) | std::pmr::basic_string<wchar_t>
`std::pmr::u8string` (C++20) | std::pmr::basic_string<char8_t>
`std::pmr::u16string` (C++17) | std::pmr::basic_string<char16_t>
`std::pmr::u32string` (C++17) | std::pmr::basic_string<char32_t>

### Parâmetros do template

- **CharT** — tipo de caractere
- **Traits** — classe traits especificando as operações sobre o tipo de caractere
- **Allocator** — Tipo [Allocator](<#/doc/named_req/Allocator>) usado para alocar armazenamento interno

### Tipos aninhados

Tipo | Definição
---|---
`traits_type` | `Traits`
`value_type` | `CharT`
`allocator_type` | `Allocator`
`size_type` | | `Allocator::size_type` | (até C++11)
[std::allocator_traits](<#/doc/memory/allocator_traits>)&lt;Allocator&gt;::size_type | (desde C++11)
`difference_type` | | Allocator::difference_type | (até C++11)
[std::allocator_traits](<#/doc/memory/allocator_traits>)&lt;Allocator&gt;::difference_type | (desde C++11)
`reference` | value_type&
`const_reference` | const value_type&
`pointer` | | `Allocator::pointer` | (até C++11)
[std::allocator_traits](<#/doc/memory/allocator_traits>)&lt;Allocator&gt;::pointer | (desde C++11)
`const_pointer` | | `Allocator::const_pointer` | (até C++11)
[std::allocator_traits](<#/doc/memory/allocator_traits>)&lt;Allocator&gt;::const_pointer | (desde C++11)
`iterator` | | [LegacyRandomAccessIterator](<#/doc/named_req/RandomAccessIterator>) e [LegacyContiguousIterator](<#/doc/named_req/ContiguousIterator>) para `value_type` | (até C++20)
[LegacyRandomAccessIterator](<#/doc/named_req/RandomAccessIterator>), [`contiguous_iterator`](<#/doc/iterator/contiguous_iterator>), e [ConstexprIterator](<#/doc/named_req/ConstexprIterator>) para `value_type` | (desde C++20)
`const_iterator` | | [LegacyRandomAccessIterator](<#/doc/named_req/RandomAccessIterator>) e [LegacyContiguousIterator](<#/doc/named_req/ContiguousIterator>) para const value_type | (até C++20)
[LegacyRandomAccessIterator](<#/doc/named_req/RandomAccessIterator>), [`contiguous_iterator`](<#/doc/iterator/contiguous_iterator>), e [ConstexprIterator](<#/doc/named_req/ConstexprIterator>) para const value_type | (desde C++20)
`reverse_iterator` | [std::reverse_iterator](<#/doc/iterator/reverse_iterator>)&lt;iterator&gt;
`const_reverse_iterator` | [std::reverse_iterator](<#/doc/iterator/reverse_iterator>)<const_iterator>

### Membros de dados

constexpr size_type `npos` [static] | o valor especial size_type(-1), seu significado exato depende do contexto

### Funções membro

[ (constructor)](<#/doc/string/basic_string/basic_string>) | constrói uma `basic_string`
(função membro pública)
[ (destructor)](<#/doc/string/basic_string/~basic_string>) | destrói a string, desalocando o armazenamento interno se usado
(função membro pública)
[ operator=](<#/>) | atribui valores à string
(função membro pública)
[ assign](<#/doc/string/basic_string/assign>) | atribui caracteres a uma string
(função membro pública)
[ assign_range](<#/doc/string/basic_string/assign_range>)(C++23) | atribui um range de caracteres a uma string
(função membro pública)
[ get_allocator](<#/doc/string/basic_string/get_allocator>) | retorna o allocator associado
(função membro pública)

##### Acesso a elementos

[ at](<#/doc/string/basic_string/at>) | acessa o caractere especificado com verificação de limites
(função membro pública)
[ operator[]](<#/doc/string/basic_string/operator_at>) | acessa o caractere especificado
(função membro pública)
[ front](<#/doc/string/basic_string/front>)(DR*) | acessa o primeiro caractere
(função membro pública)
[ back](<#/doc/string/basic_string/back>)(DR*) | acessa o último caractere
(função membro pública)
[ data](<#/doc/string/basic_string/data>) | retorna um ponteiro para o primeiro caractere de uma string
(função membro pública)
[ c_str](<#/doc/string/basic_string/c_str>) | retorna uma versão de array de caracteres C padrão não modificável da string
(função membro pública)
[ operator basic_string_view](<#/doc/string/basic_string/operator_basic_string_view>)(C++17) | retorna uma `basic_string_view` não modificável de toda a string
(função membro pública)

##### Iteradores

[ begin/cbegin](<#/doc/string/basic_string/begin>)(C++11) | retorna um iterator para o início
(função membro pública)
[ end/cend](<#/doc/string/basic_string/end>)(C++11) | retorna um iterator para o fim
(função membro pública)
[ rbegin/crbegin](<#/doc/string/basic_string/rbegin>)(C++11) | retorna um reverse iterator para o início
(função membro pública)
[ rend/crend](<#/doc/string/basic_string/rend>)(C++11) | retorna um reverse iterator para o fim
(função membro pública)

##### Capacidade

[ empty](<#/doc/string/basic_string/empty>) | verifica se a string está vazia
(função membro pública)
[ size/length](<#/doc/string/basic_string/size>) | retorna o número de caracteres
(função membro pública)
[ max_size](<#/doc/string/basic_string/max_size>) | retorna o número máximo de caracteres
(função membro pública)
[ reserve](<#/doc/string/basic_string/reserve>) | reserva armazenamento
(função membro pública)
[ capacity](<#/doc/string/basic_string/capacity>) | retorna o número de caracteres que podem ser mantidos no armazenamento atualmente alocado
(função membro pública)
[ shrink_to_fit](<#/doc/string/basic_string/shrink_to_fit>)(DR*) | reduz o uso de memória liberando memória não utilizada
(função membro pública)

##### Modificadores

[ clear](<#/doc/string/basic_string/clear>) | limpa o conteúdo
(função membro pública)
[ insert](<#/doc/string/basic_string/insert>) | insere caracteres
(função membro pública)
[ insert_range](<#/doc/string/basic_string/insert_range>)(C++23) | insere um range de caracteres
(função membro pública)
[ erase](<#/doc/string/basic_string/erase>) | remove caracteres
(função membro pública)
[ push_back](<#/doc/string/basic_string/push_back>) | anexa um caractere ao final
(função membro pública)
[ pop_back](<#/doc/string/basic_string/pop_back>)(DR*) | remove o último caractere
(função membro pública)
[ append](<#/doc/string/basic_string/append>) | anexa caracteres ao final
(função membro pública)
[ append_range](<#/doc/string/basic_string/append_range>)(C++23) | anexa um range de caracteres ao final
(função membro pública)
[ operator+=](<#/>) | anexa caracteres ao final
(função membro pública)
[ replace](<#/doc/string/basic_string/replace>) | substitui uma porção especificada de uma string
(função membro pública)
[ replace_with_range](<#/doc/string/basic_string/replace_with_range>)(C++23) | substitui uma porção especificada de uma string por um range de caracteres
(função membro pública)
[ copy](<#/doc/string/basic_string/copy>) | copia caracteres
(função membro pública)
[ resize](<#/doc/string/basic_string/resize>) | altera o número de caracteres armazenados
(função membro pública)
[ resize_and_overwrite](<#/doc/string/basic_string/resize_and_overwrite>)(C++23) | altera o número de caracteres armazenados e possivelmente sobrescreve conteúdos indeterminados via operação fornecida pelo usuário
(função membro pública)
[ swap](<#/doc/string/basic_string/swap>) | troca o conteúdo
(função membro pública)

##### Busca

[ find](<#/doc/string/basic_string/find>) | encontra a primeira ocorrência da substring fornecida
(função membro pública)
[ rfind](<#/doc/string/basic_string/rfind>) | encontra a última ocorrência de uma substring
(função membro pública)
[ find_first_of](<#/doc/string/basic_string/find_first_of>) | encontra a primeira ocorrência de caracteres
(função membro pública)
[ find_first_not_of](<#/doc/string/basic_string/find_first_not_of>) | encontra a primeira ausência de caracteres
(função membro pública)
[ find_last_of](<#/doc/string/basic_string/find_last_of>) | encontra a última ocorrência de caracteres
(função membro pública)
[ find_last_not_of](<#/doc/string/basic_string/find_last_not_of>) | encontra a última ausência de caracteres
(função membro pública)

##### Operações

[ compare](<#/doc/string/basic_string/compare>) | compara duas strings
(função membro pública)
[ starts_with](<#/doc/string/basic_string/starts_with>)(C++20) | verifica se a string começa com o prefixo fornecido
(função membro pública)
[ ends_with](<#/doc/string/basic_string/ends_with>)(C++20) | verifica se a string termina com o sufixo fornecido
(função membro pública)
[ contains](<#/doc/string/basic_string/contains>)(C++23) | verifica se a string contém a substring ou caractere fornecido
(função membro pública)
[ substr](<#/doc/string/basic_string/substr>) | retorna uma substring
(função membro pública)

### Funções não-membro

[ operator+](<#/>) | concatena duas strings, uma string e um char, ou uma string e [string_view](<#/doc/string/basic_string_view>)
(template de função)
[ operator==/operator!=/operator&lt;/operator&gt;/operator<=/operator>=/operator<=>](<#/doc/string/basic_string/operator_cmp>)(removido em C++20)(removido em C++20)(removido em C++20)(removido em C++20)(removido em C++20)(C++20) | compara lexicograficamente duas strings
(template de função)
[ std::swap(std::basic_string)](<#/doc/string/basic_string/swap2>) | especializa o algoritmo [std::swap](<#/doc/utility/swap>)
(template de função)
[ erase(std::basic_string)/erase_if(std::basic_string)](<#/doc/string/basic_string/erase2>)(C++20) | apaga todos os elementos que satisfazem critérios específicos
(template de função)

##### Entrada/saída

[ operator<&lt;/operator&gt;>](<#/doc/string/basic_string/operator_ltltgtgt>) | realiza entrada e saída de stream em strings
(template de função)
[ getline](<#/doc/string/basic_string/getline>) | lê dados de um stream de E/S para uma string
(template de função)

##### Conversões numéricas

[ stoi/stol/stoll](<#/doc/string/basic_string/stol>)(C++11)(C++11)(C++11) | converte uma string para um inteiro com sinal
(função)
[ stoul/stoull](<#/doc/string/basic_string/stoul>)(C++11)(C++11) | converte uma string para um inteiro sem sinal
(função)
[ stof/stod/stold](<#/doc/string/basic_string/stof>)(C++11)(C++11)(C++11) | converte uma string para um valor de ponto flutuante
(função)
[ to_string](<#/doc/string/basic_string/to_string>)(C++11) | converte um valor integral ou de ponto flutuante para `string`
(função)
[ to_wstring](<#/doc/string/basic_string/to_wstring>)(C++11) | converte um valor integral ou de ponto flutuante para `wstring`
(função)

### Literais

Definido no namespace inline `std::literals::string_literals`
---
[ operator""s](<#/doc/string/basic_string/operator_q__q_s>)(C++14) | converte um literal de array de caracteres para `basic_string`
(função)

### Classes auxiliares

[ std::hash<std::basic_string>](<#/doc/string/basic_string/hash>)(C++11) | suporte a hash para strings
(especialização de template de classe)

### [Guias de dedução](<#/doc/string/basic_string/deduction_guides>) (desde C++17)

### Invalidação de iteradores

Referências, ponteiros e iteradores que se referem aos elementos de uma `basic_string` podem ser invalidados por qualquer função da standard library que receba uma referência para `basic_string` não-const como argumento, como [std::getline](<#/doc/string/basic_string/getline>), [std::swap](<#/doc/utility/swap>), ou [`operator>>`](<#/doc/string/basic_string/operator_ltltgtgt>), e ao chamar funções membro não-const, exceto [`operator[]`](<#/doc/string/basic_string/operator_at>), [`at`](<#/doc/string/basic_string/at>), [`data`](<#/doc/string/basic_string/data>), [`front`](<#/doc/string/basic_string/front>), [`back`](<#/doc/string/basic_string/back>), [`begin`](<#/doc/string/basic_string/begin>), [`rbegin`](<#/doc/string/basic_string/rbegin>), [`end`](<#/doc/string/basic_string/end>), e [`rend`](<#/doc/string/basic_string/rend>).

### Notas

Embora seja exigido que `construct` ou `destroy` customizados sejam usados ao construir ou destruir elementos de `std::basic_string` até C++23, todas as implementações usaram apenas o mecanismo padrão. O requisito é corrigido por [P1072R10](<https://wg21.link/P1072R10>) para corresponder à prática existente.

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_string_udls`](<#/doc/feature_test>) | [`201304L`](<#/>) | (C++14) | Literais definidos pelo usuário para tipos de string
[`__cpp_lib_starts_ends_with`](<#/doc/feature_test>) | [`201711L`](<#/>) | (C++20) | [`starts_with`](<#/doc/string/basic_string/starts_with>), [`ends_with`](<#/doc/string/basic_string/ends_with>)
[`__cpp_lib_constexpr_string`](<#/doc/feature_test>) | [`201907L`](<#/>) | (C++20) | Constexpr para `std::basic_string`
[`__cpp_lib_char8_t`](<#/doc/feature_test>) | [`201907L`](<#/>) | (C++20) | `std::u8string`
[`__cpp_lib_erase_if`](<#/doc/feature_test>) | [`202002L`](<#/>) | (C++20) | [`erase`](<#/doc/string/basic_string/erase2>), [`erase_if`](<#/doc/string/basic_string/erase2>)
[`__cpp_lib_string_contains`](<#/doc/feature_test>) | [`202011L`](<#/>) | (C++23) | [`contains`](<#/doc/string/basic_string/contains>)
[`__cpp_lib_string_resize_and_overwrite`](<#/doc/feature_test>) | [`202110L`](<#/>) | (C++23) | [`resize_and_overwrite`](<#/doc/string/basic_string/resize_and_overwrite>)
[`__cpp_lib_containers_ranges`](<#/doc/feature_test>) | [`202202L`](<#/>) | (C++23) | Funções membro para construção, inserção e substituição que aceitam [range compatível com container](<#/doc/ranges/to>)

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <string>
    
    int main()
    {
        using namespace std::literals;
    
        // Creating a string from const char*
        std::string str1 = "hello";
    
        // Creating a string using string literal
        auto str2 = "world"s;
    
        // Concatenating strings
        std::string str3 = str1 + " " + str2;
    
        // Print out the result
        std::cout << str3 << '\n';
    
        std::string::size_type pos = str3.find(" ");
        str1 = str3.substr(pos + 1); // the part after the space
        str2 = str3.substr(0, pos);  // the part till the space
    
        std::cout << str1 << ' ' << str2 << '\n';
    
        // Accessing an element using subscript operator[]
        std::cout << str1[0] << '\n';
        str1[0] = 'W';
        std::cout << str1 << '\n';
    }
```

Saída:
```
    hello world
    world hello
    w
    World
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 530](<https://cplusplus.github.io/LWG/issue530>) | C++98 | a contiguidade do armazenamento para elementos de `basic_string` foi acidentalmente tornada não obrigatória por [LWG259](<https://cplusplus.github.io/LWG/issue259>) | exigida novamente
[LWG 2861](<https://cplusplus.github.io/LWG/issue2861>) | C++98 | `value_type` era `Traits::char_type` | alterado para `CharT`
[LWG 2994](<https://cplusplus.github.io/LWG/issue2994>)
([P1148R0](<https://wg21.link/P1148R0>)) | C++98 | o comportamento é indefinido se qualquer um de `Traits::char_type`[1](<#/doc/string/basic_string>)
e `Allocator::char_type` for diferente de `CharT` | o programa é
malformado neste caso

1. [↑](<#/doc/string/basic_string>) O caso `Traits::char_type` é corrigido em [P1148R0](<https://wg21.link/P1148R0>).

### Veja também

[ basic_string_view](<#/doc/string/basic_string_view>)(C++17) | view de string somente leitura
(template de classe)

### Links externos

[Manipulação de strings em C++](<https://en.wikipedia.org/wiki/C%2B%2B_string_handling> "enwiki:C++ string handling")
---