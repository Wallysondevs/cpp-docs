# Requisitos nomeados C++: CharTraits

**CharTraits** é uma classe de traits que abstrai operações básicas de caracteres e strings para um determinado tipo de caractere. A maioria das classes de string e de entrada/saída da standard library requer um parâmetro de tipo template CharTraits juntamente com um parâmetro de tipo template de caractere correspondente.

### Requisitos

Nenhuma operação listada abaixo em CharTraits pode lançar uma exceção.

Dado

  * `CharT`, um tipo de caractere
  * `X`, um tipo CharTraits para o tipo `CharT`
  * c, d, valores do tipo `CharT`
  * p, q, valores do tipo const CharT*
  * s, um valor do tipo `CharT*`
  * n, i, j, valores do tipo [std::size_t](<#/doc/types/size_t>)
  * e, f, valores do tipo `X::int_type`
  * pos, um valor do tipo `X::pos_type`
  * state, um valor do tipo `X::state_type`
  * r, um lvalue do tipo `CharT`

### Tipos

Tipo | Semântica
---|---
`X::char_type` | `CharT`
`X::int_type` | Um tipo que pode conter todos os valores válidos de `X::char_type` mais X::eof()
`X::off_type` | Invoca comportamento definido pela implementação se não for [std::streamoff](<#/doc/io/streamoff>) quando `X` é usado como o parâmetro de tipo template de traits em classes de entrada/saída.
`X::pos_type` |

  * Funções em classes de entrada/saída que retornam este tipo usam X::pos_type(X::off_type(-1)) como um valor inválido para sinalizar um erro
  * O uso deste valor inválido como argumento para qualquer membro de [std::istream](<#/doc/io/basic_istream>), [std::ostream](<#/doc/io/basic_ostream>) ou [std::streambuf](<#/doc/io/basic_streambuf>) que aceite um valor deste tipo é comportamento indefinido
  * Invoca comportamento definido pela implementação se este tipo não for [std::streampos](<#/doc/io/fpos>) quando `X` é usado como o parâmetro de tipo template de traits em classes de entrada/saída

`X::state_type` | [Destructible](<#/doc/named_req/Destructible>), [CopyAssignable](<#/doc/named_req/CopyAssignable>), [CopyConstructible](<#/doc/named_req/CopyConstructible>), [DefaultConstructible](<#/doc/named_req/DefaultConstructible>)

### Expressões

Expressão | Tipo de retorno | Semântica | Complexidade
---|---|---|---
X::eq(c, d) | bool | Retorna: se c deve ser tratado como igual a d | Constante
X::lt(c, d) | bool | Retorna: se c deve ser tratado como menor que d | Constante
X::compare(p, q, n) | int | Retorna:

  * ​0​ se para cada i em `[`​0​`, `n`)`, X::eq(p[i], q[i]) for verdadeiro
  * Caso contrário, um valor negativo se
    * Para algum j em `[`​0​`, `n`)`, X::lt(p[j], q[j]) for verdadeiro e
    * Para cada i em `[`​0​`, `j`)`, X::eq(p[i], q[i]) for verdadeiro
  * Caso contrário, um valor positivo

| Linear
X::length(p) | [std::size_t](<#/doc/types/size_t>) | Retorna: o menor i tal que X::eq(p[i], CharT()) for verdadeiro | Linear
X::find(p, n, c) | const X::char_type* | Retorna:

  * O menor q em `[`p`, `p + n`)` tal que X::eq(*q, c) for verdadeiro
  * ​0​ caso contrário

| Linear
X::move(s, p, n) | `X::char_type*` |

  * Para cada i em `[`​0​`, `n`)`, executa X::assign(s[i], p[i])
  * Copia corretamente mesmo onde os ranges `[`p`, `p + n`)` e `[`s`, `s + n`)` se sobrepõem
  * Retorna: s

| Linear
X::copy(s, p, n) | `X::char_type*` |

  * Requer: `[`p`, `p + n`)` e `[`s`, `s + n`)` não se sobrepõem
  * Retorna: s
  * Para cada i em `[`​0​`, `n`)`, executa X::assign(s[i], p[i])

| Linear
X::assign(r, d) | (Não usado) | Atribui r = d | Constante
X::assign(s, n, c) | `X::char_type*` |

  * Para cada i em `[`​0​`, `n`)`, executa X::assign(s[i], c).
  * Retorna: s

| Linear
X::not_eof(e) | `X::int_type` | Retorna:

  * e se X::eq_int_type(e, X::eof()) for falso
  * Caso contrário, um valor f tal que X::eq_int_type(f, X::eof()) for falso

| Constante
X::to_char_type(e) | `X::char_type` | Retorna:

  * Se para algum c, X::eq_int_type(e, X::to_int_type(c)) for verdadeiro, c
  * Caso contrário, algum valor não especificado

| Constante
X::to_int_type(c) | `X::int_type` | Retorna: algum valor e, restrito pelas definições de `X::to_char_type` e `X::eq_int_type` | Constante
X::eq_int_type(e, f) | bool |

  * Para todos c e d, X::eq(c, d) é igual a X::eq_int_type(X::to_int_type(c),
X::to_int_type(d))
  * Retorna:
    * Produz X::eq(c, d) se para algum c e d, e == X::to_int_type(c) e f == X::to_int_type(d)
    * Caso contrário, produz verdadeiro se e e f forem ambas cópias de X::eof()
    * Caso contrário, produz falso se um de e e f for uma cópia de X::eof() e o outro não for
    * Caso contrário, o valor é não especificado

| Constante
X::eof() | `X::int_type` | Retorna: um valor e tal que X::eq_int_type(e, X::to_int_type(c)) é falso para todos os valores c | Constante

### Standard library

CharTraits é requerido pelos seguintes templates de classe da standard library como um parâmetro de tipo template:

##### Strings

---
[ basic_string](<#/doc/string/basic_string>) | armazena e manipula sequências de caracteres
(template de classe)
[ basic_string_view](<#/doc/string/basic_string_view>)(C++17) | view de string somente leitura
(template de classe)

##### Streams

[ basic_ios](<#/doc/io/basic_ios>) | gerencia um stream buffer arbitrário
(template de classe)
[ basic_istream](<#/doc/io/basic_istream>) | envolve um dispositivo abstrato dado ([std::basic_streambuf](<#/doc/io/basic_streambuf>))
e fornece interface de entrada de alto nível
(template de classe)
[ basic_ifstream](<#/doc/io/basic_ifstream>) | implementa operações de entrada de stream de arquivo de alto nível
(template de classe)
[ basic_istringstream](<#/doc/io/basic_istringstream>) | implementa operações de entrada de stream de string de alto nível
(template de classe)
[ basic_ispanstream](<#/doc/io/basic_ispanstream>)(C++23) | implementa operações de entrada de buffer de caractere fixo
(template de classe)
[ basic_ostream](<#/doc/io/basic_ostream>) | envolve um dispositivo abstrato dado ([std::basic_streambuf](<#/doc/io/basic_streambuf>))
e fornece interface de saída de alto nível
(template de classe)
[ basic_ofstream](<#/doc/io/basic_ofstream>) | implementa operações de saída de stream de arquivo de alto nível
(template de classe)
[ basic_ostringstream](<#/doc/io/basic_ostringstream>) | implementa operações de saída de stream de string de alto nível
(template de classe)
[ basic_osyncstream](<#/doc/io/basic_osyncstream>)(C++20) | wrapper de stream de saída sincronizado
(template de classe)
[ basic_ospanstream](<#/doc/io/basic_ospanstream>)(C++23) | implementa operações de saída de buffer de caractere fixo
(template de classe)
[ basic_iostream](<#/doc/io/basic_iostream>) | envolve um dispositivo abstrato dado ([std::basic_streambuf](<#/doc/io/basic_streambuf>))
e fornece interface de entrada/saída de alto nível
(template de classe)
[ basic_fstream](<#/doc/io/basic_fstream>) | implementa operações de entrada/saída de stream de arquivo de alto nível
(template de classe)
[ basic_stringstream](<#/doc/io/basic_stringstream>) | implementa operações de entrada/saída de stream de string de alto nível
(template de classe)
[ basic_spanstream](<#/doc/io/basic_spanstream>)(C++23) | implementa operações de entrada/saída de buffer de caractere fixo
(template de classe)

##### Stream iterators

[ istream_iterator](<#/doc/iterator/istream_iterator>) | iterator de entrada que lê de [std::basic_istream](<#/doc/io/basic_istream>)
(template de classe)
[ ostream_iterator](<#/doc/iterator/ostream_iterator>) | iterator de saída que escreve para [std::basic_ostream](<#/doc/io/basic_ostream>)
(template de classe)

##### Stream buffers

[ basic_streambuf](<#/doc/io/basic_streambuf>) | abstrai um dispositivo bruto
(template de classe)
[ basic_filebuf](<#/doc/io/basic_filebuf>) | implementa dispositivo de arquivo bruto
(template de classe)
[ basic_stringbuf](<#/doc/io/basic_stringbuf>) | implementa dispositivo de string bruto
(template de classe)
[ basic_syncbuf](<#/doc/io/basic_syncbuf>)(C++20) | wrapper de dispositivo de saída sincronizado
(template de classe)
[ basic_spanbuf](<#/doc/io/basic_spanbuf>)(C++23) | implementa dispositivo de buffer de caractere fixo bruto
(template de classe)

##### Stream buffer iterators

[ istreambuf_iterator](<#/doc/iterator/istreambuf_iterator>) | iterator de entrada que lê de [std::basic_streambuf](<#/doc/io/basic_streambuf>)
(template de classe)
[ ostreambuf_iterator](<#/doc/iterator/ostreambuf_iterator>) | iterator de saída que escreve para [std::basic_streambuf](<#/doc/io/basic_streambuf>)
(template de classe)

CharTraits é satisfeito pelas seguintes especializações explícitas da standard library de [std::char_traits](<#/doc/string/char_traits>):

```cpp
template<> class char_traits<char>;
template<> class char_traits<wchar_t>;
template<> class char_traits<char8_t>;
template<> class char_traits<char16_t>;
template<> class char_traits<char32_t>;
```
(desde C++20)
(desde C++11)
(desde C++11)

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
[LWG 335](<https://cplusplus.github.io/LWG/issue335>) | C++98 | os requisitos na sobrecarga binária de
`assign` não impediam atribuições a rvalues | seu primeiro argumento
só pode ser um lvalue
[LWG 352](<https://cplusplus.github.io/LWG/issue352>) | C++98 | `X::state_type` era apenas
requerido para ser [CopyConstructible](<#/doc/named_req/CopyConstructible>) | também é requerido para ser
[CopyAssignable](<#/doc/named_req/CopyAssignable>) e [DefaultConstructible](<#/doc/named_req/DefaultConstructible>)
[LWG 3085](<https://cplusplus.github.io/LWG/issue3085>) | C++98 | X::copy(s, p, n) apenas exigia que p não
estivesse em `[`s`, `s + n`)`, o que é muito fraco[1](<#/doc/named_req/CharTraits>) | requer que `[`p`, `p + n`)` e
`[`s`, `s + n`)` não se sobreponham

  1. [↑](<#/doc/named_req/CharTraits>) `[`p`, `p + n`)` e `[`s`, `s + n`)` podem se sobrepor; usar [std::memcpy](<#/doc/string/byte/memcpy>) para implementar `X::copy` resulta em comportamento indefinido neste caso.

*[_(as is)_]: A::pointer