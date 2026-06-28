# std::filesystem::path::assign

```cpp
path& assign( string_type&& source );  // (1) (desde C++17)
template< class Source >
path& assign( const Source& source );  // (2) (desde C++17)
template< class InputIt >
path& assign( InputIt first, InputIt last );  // (3) (desde C++17)
```

Substitui o conteúdo do objeto `path` por um novo nome de caminho construído a partir da sequência de caracteres fornecida.

1) Atribui o nome de caminho identificado pela string `source` de formato detectado, que é deixada em um estado válido, mas não especificado.

2) Atribui o nome de caminho identificado pelo range de caracteres `source` de formato detectado.

3) Atribui o nome de caminho identificado pelo range de caracteres `[first, last)` de formato detectado.

(2) participa da resolução de sobrecarga apenas se `Source` e `path` não forem do mesmo tipo, e se:

*   `Source` é uma especialização de [std::basic_string](<#/doc/string/basic_string>) ou [std::basic_string_view](<#/doc/string/basic_string_view>), ou
*   [std::iterator_traits](<#/doc/iterator/iterator_traits>)<[std::decay_t](<#/doc/types/decay>)&lt;Source&gt;>::value_type é válido e denota um tipo de caractere de codificação possivelmente qualificado com `const` (char, char8_t, (desde C++20)char16_t, char32_t, ou wchar_t).

### Parâmetros

- **source** — um range de caracteres a ser usado, representado como [std::string](<#/doc/string/basic_string>), [std::string_view](<#/doc/string/basic_string_view>), ponteiro para uma string multibyte terminada em nulo, ou como um input iterator com tipo de valor char que aponta para uma string multibyte terminada em nulo
- **first, last** — um range de caracteres a ser usado
Requisitos de tipo
-`InputIt` deve satisfazer os requisitos de [LegacyInputIterator](<#/doc/named_req/InputIterator>).
-O tipo de valor de `InputIt` deve ser um dos tipos de caracteres codificados (char, wchar_t, char16_t e char32_t)

### Valor de retorno

`*this`

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 3244](<https://cplusplus.github.io/LWG/issue3244>) | C++17 | restrição de que `Source` não pode ser `path` estava faltando | adicionada

### Veja também

[ operator=](<#/>) | atribui outro path
(função membro pública)