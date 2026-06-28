# std::basic_string_view

Definido no cabeçalho `[<string_view>](<#/doc/header/string_view>)`

```c
template<
class CharT,
class Traits = std::char_traits<CharT>
> class basic_string_view;
```

O template de classe `basic_string_view` descreve um objeto que pode se referir a uma sequência contígua constante de `CharT` com o primeiro elemento da sequência na posição zero.

Para uma `basic_string_view` str, ponteiros, iteradores e referências a elementos de str são invalidados quando uma operação invalida um ponteiro no range `[`str.data()`, `str.data() + str.size()`).`

Cada especialização de `std::basic_string_view` é um tipo [TriviallyCopyable](<#/doc/named_req/TriviallyCopyable>). | (desde C++23)

Uma implementação típica contém apenas dois membros: um ponteiro para `CharT` constante e um tamanho.

Vários typedefs para tipos de caracteres comuns são fornecidos:

Definido no cabeçalho `[<string_view>](<#/doc/header/string_view>)`
---
Tipo | Definição
---|---
**std::string_view** (C++17) | std::basic_string_view&lt;char&gt;
**std::wstring_view** (C++17) | std::basic_string_view<wchar_t>
**std::u8string_view** (C++20) | std::basic_string_view<char8_t>
**std::u16string_view** (C++17) | std::basic_string_view<char16_t>
**std::u32string_view** (C++17) | std::basic_string_view<char32_t>

### Parâmetros de template

- **CharT** — tipo de caractere
- **Traits** — Classe [CharTraits](<#/doc/named_req/CharTraits>) especificando as operações no tipo de caractere. Assim como para [std::basic_string](<#/doc/string/basic_string>), `Traits::char_type` deve nomear o mesmo tipo que `CharT` ou o programa é malformado.

### Tipos membro

Tipo aninhado | Definição
---|---
`traits_type` | `Traits`
`value_type` | `CharT`
`pointer` | CharT*
`const_pointer` | const CharT*
`reference` | CharT&
`const_reference` | const CharT&
`const_iterator` | [LegacyRandomAccessIterator](<#/doc/named_req/RandomAccessIterator>) constante definido pela implementação,
| e [LegacyContiguousIterator](<#/doc/named_req/ContiguousIterator>) | (até C++20)
[ConstexprIterator](<#/doc/named_req/ConstexprIterator>), e [`contiguous_iterator`](<#/doc/iterator/contiguous_iterator>) | (desde C++20)

cujo `value_type` é `CharT`

`iterator` | `const_iterator`
---|---
`const_reverse_iterator` | [std::reverse_iterator](<#/doc/iterator/reverse_iterator>)<const_iterator>
`reverse_iterator` | `const_reverse_iterator`
`size_type` | [std::size_t](<#/doc/types/size_t>)
`difference_type` | [std::ptrdiff_t](<#/doc/types/ptrdiff_t>)

Nota: `iterator` e `const_iterator` são do mesmo tipo porque string views são visões para sequências de caracteres constantes.

Todos os requisitos para os tipos de iterator de um [Container](<#/doc/named_req/Container>) se aplicam também aos tipos `iterator` e `const_iterator` de `basic_string_view`.

### Funções membro

##### Construtores e atribuição

---
[ (construtor)](<#/doc/string/basic_string_view/basic_string_view>) | constrói um `basic_string_view`
(função membro pública)
[ operator=](<#/>) | atribui uma view
(função membro pública)

##### Iteradores

[ begin/cbegin](<#/doc/string/basic_string_view/begin>) | retorna um iterator para o início
(função membro pública)
[ end/cend](<#/doc/string/basic_string_view/end>) | retorna um iterator para o fim
(função membro pública)
[ rbegin/crbegin](<#/doc/string/basic_string_view/rbegin>) | retorna um reverse iterator para o início
(função membro pública)
[ rend/crend](<#/doc/string/basic_string_view/rend>) | retorna um reverse iterator para o fim
(função membro pública)

##### Acesso a elementos

[ operator[]](<#/doc/string/basic_string_view/operator_at>) | acessa o caractere especificado
(função membro pública)
[ at](<#/doc/string/basic_string_view/at>) | acessa o caractere especificado com verificação de limites
(função membro pública)
[ front](<#/doc/string/basic_string_view/front>) | acessa o primeiro caractere
(função membro pública)
[ back](<#/doc/string/basic_string_view/back>) | acessa o último caractere
(função membro pública)
[ data](<#/doc/string/basic_string_view/data>) | retorna um ponteiro para o primeiro caractere de uma view
(função membro pública)

##### Capacidade

[ size/length](<#/doc/string/basic_string_view/size>) | retorna o número de caracteres
(função membro pública)
[ max_size](<#/doc/string/basic_string_view/max_size>) | retorna o número máximo de caracteres
(função membro pública)
[ empty](<#/doc/string/basic_string_view/empty>) | verifica se a view está vazia
(função membro pública)

##### Modificadores

[ remove_prefix](<#/doc/string/basic_string_view/remove_prefix>) | encolhe a view movendo seu início para frente
(função membro pública)
[ remove_suffix](<#/doc/string/basic_string_view/remove_suffix>) | encolhe a view movendo seu fim para trás
(função membro pública)
[ swap](<#/doc/string/basic_string_view/swap>) | troca os conteúdos
(função membro pública)

##### Operações

[ copy](<#/doc/string/basic_string_view/copy>) | copia caracteres
(função membro pública)
[ substr](<#/doc/string/basic_string_view/substr>) | retorna uma substring
(função membro pública)
[ compare](<#/doc/string/basic_string_view/compare>) | compara duas views
(função membro pública)
[ starts_with](<#/doc/string/basic_string_view/starts_with>)(C++20) | verifica se a string view começa com o prefixo dado
(função membro pública)
[ ends_with](<#/doc/string/basic_string_view/ends_with>)(C++20) | verifica se a string view termina com o sufixo dado
(função membro pública)
[ contains](<#/doc/string/basic_string_view/contains>)(C++23) | verifica se a string view contém a substring ou caractere dado
(função membro pública)
[ find](<#/doc/string/basic_string_view/find>) | encontra caracteres na view
(função membro pública)
[ rfind](<#/doc/string/basic_string_view/rfind>) | encontra a última ocorrência de uma substring
(função membro pública)
[ find_first_of](<#/doc/string/basic_string_view/find_first_of>) | encontra a primeira ocorrência de caracteres
(função membro pública)
[ find_last_of](<#/doc/string/basic_string_view/find_last_of>) | encontra a última ocorrência de caracteres
(função membro pública)
[ find_first_not_of](<#/doc/string/basic_string_view/find_first_not_of>) | encontra a primeira ausência de caracteres
(função membro pública)
[ find_last_not_of](<#/doc/string/basic_string_view/find_last_not_of>) | encontra a última ausência de caracteres
(função membro pública)

### Constantes

[ npos](<#/doc/string/basic_string_view/npos>)[static] | valor especial. O significado exato depende do contexto
(constante membro estática pública)

### Funções não-membro

[ operator==operator!=operator&lt;operator&gt;operator<=operator>=operator<=>](<#/doc/string/basic_string_view/operator_cmp>)(C++17)(removido em C++20)(removido em C++20)(removido em C++20)(removido em C++20)(removido em C++20)(C++20) | compara lexicograficamente duas string views
(template de função)

##### Entrada/saída

[ operator<<](<#/doc/string/basic_string_view/operator_ltlt>)(C++17) | realiza saída de stream em string views
(template de função)

### Literais

Definido no namespace inline `[std::literals::string_view_literals](<#/doc/header/string_view>)`
---
[ operator""sv](<#/doc/string/basic_string_view/operator_q__q_sv>)(C++17) | cria uma string view de um literal de array de caracteres
(função)

### Classes auxiliares

[ std::hash<std::string_view>std::hash<std::wstring_view>std::hash<std::u8string_view>std::hash<std::u16string_view>std::hash<std::u32string_view>](<#/doc/string/basic_string_view/hash>)(C++17)(C++17)(C++20)(C++17)(C++17) | suporte a hash para string views
(especialização de template de classe)

### Templates auxiliares

```cpp
template< class CharT, class Traits >
inline constexpr bool
ranges::enable_borrowed_range<std::basic_string_view<CharT, Traits>> = true;  // (desde C++20)
```

Esta especialização de [`ranges::enable_borrowed_range`](<#/doc/ranges/borrowed_range>) faz com que `basic_string_view` satisfaça [`borrowed_range`](<#/doc/ranges/borrowed_range>).

```cpp
template< class CharT, class Traits >
inline constexpr bool
ranges::enable_view<std::basic_string_view<CharT, Traits>> = true;  // (desde C++20)
```

Esta especialização de [ranges::enable_view](<#/doc/ranges/view>) faz com que `basic_string_view` satisfaça [`view`](<#/doc/ranges/view>).

### [Guias de dedução](<#/doc/string/basic_string_view/deduction_guides>)

| (desde C++20)

### Notas

É responsabilidade do programador garantir que `std::string_view` não sobreviva ao array de caracteres apontado:
```cpp
    std::string_view good{"a string literal"};
        // Caso "bom": `good` aponta para um array estático.
        // Literais de string residem em armazenamento de dados persistente.
    
    std::string_view bad{"a temporary string"s};
        // Caso "ruim": `bad` contém um ponteiro pendente, já que o temporário std::string,
        // criado por std::operator""s, será destruído no final da instrução.
```

Especializações de `std::basic_string_view` já são tipos trivially copyable em todas as implementações existentes, mesmo antes do requisito formal introduzido no C++23.

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_string_view`](<#/doc/feature_test>) | [`201606L`](<#/>) | (C++17) | [`std::string_view`](<#/doc/string/basic_string_view>)
[`201803L`](<#/>) | (C++20) | [ConstexprIterator](<#/doc/named_req/ConstexprIterator>)
[`__cpp_lib_string_contains`](<#/doc/feature_test>) | [`202011L`](<#/>) | (C++23) | [`contains`](<#/doc/string/basic_string_view/contains>)

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <string_view>
    
    int main()
    {
        constexpr std::string_view unicode[]{"▀▄─", "▄▀─", "▀─▄", "▄─▀"};
    
        for (int y{}, p{}; y != 6; ++y, p = ((p + 1) % 4))
        {
            for (int x{}; x != 16; ++x)
                std::cout << unicode[p];
            std::cout << '\n';
        }
    }
```

Saída:
```
    ▀▄─▀▄─▀▄─▀▄─▀▄─▀▄─▀▄─▀▄─▀▄─▀▄─▀▄─▀▄─▀▄─▀▄─▀▄─▀▄─
    ▄▀─▄▀─▄▀─▄▀─▄▀─▄▀─▄▀─▄▀─▄▀─▄▀─▄▀─▄▀─▄▀─▄▀─▄▀─▄▀─
    ▀─▄▀─▄▀─▄▀─▄▀─▄▀─▄▀─▄▀─▄▀─▄▀─▄▀─▄▀─▄▀─▄▀─▄▀─▄▀─▄
    ▄─▀▄─▀▄─▀▄─▀▄─▀▄─▀▄─▀▄─▀▄─▀▄─▀▄─▀▄─▀▄─▀▄─▀▄─▀▄─▀
    ▀▄─▀▄─▀▄─▀▄─▀▄─▀▄─▀▄─▀▄─▀▄─▀▄─▀▄─▀▄─▀▄─▀▄─▀▄─▀▄─
    ▄▀─▄▀─▄▀─▄▀─▄▀─▄▀─▄▀─▄▀─▄▀─▄▀─▄▀─▄▀─▄▀─▄▀─▄▀─▄▀─
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 3203](<https://cplusplus.github.io/LWG/issue3203>) | C++17 | apenas ponteiros, iteradores e referências retornados das funções membro de `basic_string_view` poderiam ser invalidados | todos os ponteiros, iteradores e referências para elementos de `basic_string_view` podem ser invalidados

### Veja também

[ basic_string](<#/doc/string/basic_string>) | armazena e manipula sequências de caracteres
(template de classe)
[ operator+](<#/>) | concatena duas strings, uma string e um char, ou uma string e uma `string_view`
(template de função)
[ span](<#/doc/container/span>)(C++20) | uma view não proprietária sobre uma sequência contígua de objetos
(template de classe)
[ initializer_list](<#/doc/utility/initializer_list>)(C++11) | referencia um array temporário criado em [list-initialization](<#/doc/language/list_initialization>)
(template de classe)