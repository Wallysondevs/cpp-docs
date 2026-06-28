# Biblioteca de strings

### Caracteres
Na biblioteca padrão C++, um _caractere_ é um objeto que, quando tratado sequencialmente, pode representar texto.

O termo significa não apenas objetos de [tipos de caractere](<#/doc/language/type-id>), mas também qualquer valor que possa ser representado por um tipo que forneça as definições especificadas na biblioteca de strings e nas seguintes bibliotecas:

*   [biblioteca de localização](<#/doc/locale>)
*   [biblioteca de entrada/saída](<#/doc/io>)
*   [biblioteca de expressões regulares](<#/doc/regex>)

| (desde C++11)

Na biblioteca de strings e na biblioteca de expressões regulares (desde C++11), um caractere pode ser apenas de _tipos semelhantes a char_ (char-like types), ou seja, aqueles tipos não-array que satisfazem os requisitos de [PODType](<#/doc/named_req/PODType>)(até C++20)[TrivialType](<#/doc/named_req/TrivialType>) e [StandardLayoutType](<#/doc/named_req/StandardLayoutType>)(desde C++20)(até C++26)[TriviallyCopyable](<#/doc/named_req/TriviallyCopyable>) e [StandardLayoutType](<#/doc/named_req/StandardLayoutType>)(desde C++26).

Para qualquer tipo semelhante a char `T`, [std::is_trivially_default_constructible_v](<#/doc/types/is_default_constructible>)&lt;T&gt; é verdadeiro. | (desde C++26)

Portanto, caracteres também são referidos como _objetos semelhantes a char_ (char-like objects) na biblioteca de strings e na biblioteca de expressões regulares (desde C++11).

Alguns componentes da biblioteca padrão aceitam _tipos de contêiner de caractere_ (character container types). Eles também são tipos usados para representar caracteres individuais. Tais tipos são usados para um dos argumentos de template de [std::char_traits](<#/doc/string/char_traits>) e os class templates que usam [std::char_traits](<#/doc/string/char_traits>).

### Componentes da biblioteca

A biblioteca de strings C++ inclui os seguintes componentes:

#### Traits de caractere

Muitos class templates relacionados a caracteres (como [std::basic_string](<#/doc/string/basic_string>)) precisam de um conjunto de tipos e funções relacionados para completar a definição de sua semântica. Esses tipos e funções são fornecidos como um conjunto de nomes de typedef de membro e funções no parâmetro de template `Traits` usado por cada template. As classes que são capazes de completar essa semântica são [CharTraits](<#/doc/named_req/CharTraits>).

A biblioteca de strings fornece o class template [std::char_traits](<#/doc/string/char_traits>) que define tipos e funções para [std::basic_string](<#/doc/string/basic_string>) e [std::basic_string_view](<#/doc/string/basic_string_view>)(desde C++17).

As seguintes especializações são definidas, todas elas satisfazem os requisitos de [CharTraits](<#/doc/named_req/CharTraits>):

Definido no header `[<string>](<#/doc/header/string>)`

```cpp
template<> class char_traits<char>;
template<> class char_traits<wchar_t>;
template<> class char_traits<char8_t>;  // (desde C++20)
template<> class char_traits<char16_t>;  // (desde C++11)
template<> class char_traits<char32_t>;  // (desde C++11)
```

Quando um tipo de contêiner de caractere definido pelo usuário para [std::basic_string](<#/doc/string/basic_string>) e [std::basic_string_view](<#/doc/string/basic_string_view>)(desde C++17) é usado, também é necessário fornecer uma classe de trait de caractere correspondente (que pode ser uma especialização de [std::char_traits](<#/doc/string/char_traits>)).

#### Classes de string ([std::string](<#/doc/string/basic_string>) etc.)

O class template [std::basic_string](<#/doc/string/basic_string>) generaliza como sequências de caracteres são manipuladas e armazenadas. A criação, manipulação e destruição de strings são todas tratadas por um conjunto conveniente de métodos de classe e funções relacionadas.

Várias especializações de [std::basic_string](<#/doc/string/basic_string>) são fornecidas para tipos comumente usados:

Definido no header `[<string>](<#/doc/header/string>)`
---
Tipo | Definição
---|---
`std::string` | [std::basic_string](<#/doc/string/basic_string>)&lt;char&gt;
`std::wstring` | [std::basic_string](<#/doc/string/basic_string>)<wchar_t>
`std::u8string` (desde C++20) | [std::basic_string](<#/doc/string/basic_string>)<char8_t>
`std::u16string` (desde C++11) | [std::basic_string](<#/doc/string/basic_string>)<char16_t>
`std::u32string` (desde C++11) | [std::basic_string](<#/doc/string/basic_string>)<char32_t>

#### Classes de string view ([std::string_view](<#/doc/string/basic_string_view>) etc.) (desde C++17)

O class template [std::basic_string_view](<#/doc/string/basic_string_view>) fornece um objeto leve que oferece acesso somente leitura a uma string ou a uma parte de uma string usando uma interface semelhante à interface de [std::basic_string](<#/doc/string/basic_string>).

Várias especializações de [std::basic_string_view](<#/doc/string/basic_string_view>) são fornecidas para tipos comumente usados:

Definido no header `[<string_view>](<#/doc/header/string_view>)`
---
Tipo | Definição
---|---
`std::string_view` | [std::basic_string_view](<#/doc/string/basic_string_view>)&lt;char&gt;
`std::wstring_view` | [std::basic_string_view](<#/doc/string/basic_string_view>)<wchar_t>
`std::u8string_view` (desde C++20) | [std::basic_string_view](<#/doc/string/basic_string_view>)<char8_t>
`std::u16string_view` | [std::basic_string_view](<#/doc/string/basic_string_view>)<char16_t>
`std::u32string_view` | [std::basic_string_view](<#/doc/string/basic_string_view>)<char32_t>

### Bibliotecas relevantes

A [biblioteca de processamento de texto](<#/doc/text>) fornece suporte para localizações, conversões de string (por exemplo, [`std::toupper`](<#/doc/locale/toupper>)), funções de classificação de caractere (por exemplo, [`std::isspace`](<#/doc/locale/isspace>)), e reconhecimento de codificação de texto ([`std::text_encoding`](<#/doc/locale/text_encoding>)).

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 1170](<https://cplusplus.github.io/LWG/issue1170>) | C++98 | tipos semelhantes a char poderiam ser tipos array | proibido

### Veja também

[Documentação C](<#/>) para a biblioteca de Strings
---