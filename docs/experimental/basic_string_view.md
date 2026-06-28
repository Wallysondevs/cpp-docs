# std::experimental::basic_string_view

Definido no cabeçalho `[<experimental/string_view>](<#/doc/header/experimental/string_view>)`

```c
template<
class CharT,
class Traits = std::char_traits<CharT>
> class basic_string_view;
```

O template de classe `basic_string_view` descreve um objeto que pode referenciar uma sequência contígua constante de objetos tipo char com o primeiro elemento da sequência na posição zero.

Uma implementação típica contém apenas dois membros: um ponteiro para `CharT` constante e um tamanho.

Vários typedefs para tipos de caracteres comuns são fornecidos:

Definido no cabeçalho `[<experimental/string_view>](<#/doc/header/experimental/string_view>)`
---
Tipo | Definição
---|---
**std::experimental::string_view** | std::experimental::basic_string_view&lt;char&gt;
**std::experimental::wstring_view** | std::experimental::basic_string_view<wchar_t>
**std::experimental::u16string_view** | std::experimental::basic_string_view<char16_t>
**std::experimental::u32string_view** | std::experimental::basic_string_view<char32_t>

### Parâmetros do template

- **CharT** — tipo de caractere
- **Traits** — classe traits especificando as operações no tipo de caractere

### Tipos membro

Tipo membro | Definição
---|---
`traits_type` | `Traits`
`value_type` | `CharT`
`pointer` | `CharT*`
`const_pointer` | `const CharT*`
`reference` | `CharT&`
`const_reference` | `const CharT&`
`const_iterator` | [LegacyRandomAccessIterator](<#/doc/named_req/RandomAccessIterator>) definido pela implementação
`iterator` | `const_iterator`
`reverse_iterator` | `const_reverse_iterator`
`const_reverse_iterator` | [std::reverse_iterator](<#/doc/iterator/reverse_iterator>)<const_iterator>
`size_type` | [std::size_t](<#/doc/types/size_t>)
`difference_type` | [std::ptrdiff_t](<#/doc/types/ptrdiff_t>)

Nota: `iterator` e `const_iterator` são do mesmo tipo porque string views são views para sequências de caracteres constantes.

### Funções membro

[ (construtor)](<#/doc/experimental/basic_string_view/basic_string_view>) | constrói um `basic_string_view`
(função membro pública)
[ operator=](<#/>) | atribui uma view
(função membro pública)

##### Iteradores

[ begincbegin](<#/doc/experimental/basic_string_view/begin>) | retorna um iterador para o início
(função membro pública)
[ endcend](<#/doc/experimental/basic_string_view/end>) | retorna um iterador para o fim
(função membro pública)
[ rbegincrbegin](<#/doc/experimental/basic_string_view/rbegin>) | retorna um iterador reverso para o início
(função membro pública)
[ rendcrend](<#/doc/experimental/basic_string_view/rend>) | retorna um iterador reverso para o fim
(função membro pública)

##### Acesso a elementos

[ operator[]](<#/doc/experimental/basic_string_view/operator_at>) | acessa o caractere especificado
(função membro pública)
[ at](<#/doc/experimental/basic_string_view/at>) | acessa o caractere especificado com verificação de limites
(função membro pública)
[ front](<#/doc/experimental/basic_string_view/front>) | acessa o primeiro caractere
(função membro pública)
[ back](<#/doc/experimental/basic_string_view/back>) | acessa o último caractere
(função membro pública)
[ data](<#/doc/experimental/basic_string_view/data>) | retorna um ponteiro para o primeiro caractere de uma view
(função membro pública)

##### Capacidade

[ sizelength](<#/doc/experimental/basic_string_view/size>) | retorna o número de caracteres
(função membro pública)
[ max_size](<#/doc/experimental/basic_string_view/max_size>) | retorna o número máximo de caracteres
(função membro pública)
[ empty](<#/doc/experimental/basic_string_view/empty>) | verifica se a view está vazia
(função membro pública)

##### Modificadores

[ remove_prefix](<#/doc/experimental/basic_string_view/remove_prefix>) | encolhe a view movendo seu início para frente
(função membro pública)
[ remove_suffix](<#/doc/experimental/basic_string_view/remove_suffix>) | encolhe a view movendo seu fim para trás
(função membro pública)
[ swap](<#/doc/experimental/basic_string_view/swap>) | troca o conteúdo
(função membro pública)

##### Operações

[ to_stringoperator basic_string](<#/doc/experimental/basic_string_view/to_string>) | cria uma string a partir da view
(função membro pública)
[ copy](<#/doc/experimental/basic_string_view/copy>) | copia caracteres
(função membro pública)
[ substr](<#/doc/experimental/basic_string_view/substr>) | retorna uma substring
(função membro pública)
[ compare](<#/doc/experimental/basic_string_view/compare>) | compara duas views
(função membro pública)
[ find](<#/doc/experimental/basic_string_view/find>) | encontra caracteres na view
(função membro pública)
[ rfind](<#/doc/experimental/basic_string_view/rfind>) | encontra a última ocorrência de uma substring
(função membro pública)
[ find_first_of](<#/doc/experimental/basic_string_view/find_first_of>) | encontra a primeira ocorrência de caracteres
(função membro pública)
[ find_last_of](<#/doc/experimental/basic_string_view/find_last_of>) | encontra a última ocorrência de caracteres
(função membro pública)
[ find_first_not_of](<#/doc/experimental/basic_string_view/find_first_not_of>) | encontra a primeira ausência de caracteres
(função membro pública)
[ find_last_not_of](<#/doc/experimental/basic_string_view/find_last_not_of>) | encontra a última ausência de caracteres
(função membro pública)

### Constantes

[ npos](<#/doc/experimental/basic_string_view/npos>)[static] | valor especial. O significado exato depende do contexto
(constante membro estática pública)

### Funções não-membro

[ operator==operator!=operator&lt;operator&gt;operator<=operator>=](<#/doc/experimental/basic_string_view/operator_cmp>) | compara lexicograficamente duas views
(template de função)

##### Entrada/saída

[ operator<<](<#/doc/experimental/basic_string_view/operator_ltlt>) | realiza saída de stream em views
(template de função)

### Classes auxiliares

[ std::hash<std::experimental::string_view>std::hash<std::experimental::wstring_view>std::hash<std::experimental::u16string_view>std::hash<std::experimental::u32string_view>](<#/doc/experimental/basic_string_view/hash>) | suporte a hash para views
(especialização de template de classe)

### Macros de teste de recurso

__cpp_lib_experimental_string_view | um valor de pelo menos 201411 indica que o template basic_string_view é suportado
(constante de macro)