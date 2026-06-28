# std::basic_streambuf

Definido no cabeçalho `[<streambuf>](<#/doc/header/streambuf>)`

```c
template<
class CharT,
class Traits = std::char_traits<CharT>
> class basic_streambuf;
```

A classe `basic_streambuf` controla a entrada e saída para uma sequência de caracteres. Ela inclui e fornece acesso a

1.  A _sequência de caracteres controlada_ , também chamada de _buffer_ , que pode conter a _sequência de entrada_ (também chamada de _get area_) para armazenar em buffer as operações de entrada e/ou a _sequência de saída_ (também chamada de _put area_) para armazenar em buffer as operações de saída.
2.  A _sequência de caracteres associada_ , também chamada de _fonte_ (para entrada) ou _sumidouro_ (para saída). Esta pode ser uma entidade acessada através da API do sistema operacional (arquivo, socket TCP, porta serial, outro dispositivo de caracteres), ou pode ser um objeto ([std::vector](<#/doc/container/vector>), [array](<#/doc/language/array>), [string literal](<#/doc/language/string_literal>)), que pode ser interpretado como uma fonte ou sumidouro de caracteres.

Os objetos de stream de E/S [std::basic_istream](<#/doc/io/basic_istream>) e [std::basic_ostream](<#/doc/io/basic_ostream>), assim como todos os objetos derivados deles ([std::ofstream](<#/doc/io/basic_ofstream>), [std::stringstream](<#/doc/io/basic_stringstream>), etc.), são implementados inteiramente em termos de `std::basic_streambuf`.

A sequência de caracteres controlada é um array de `CharT` que, a todo momento, representa uma subsequência, ou uma "janela" para a sequência de caracteres associada. Seu estado é descrito por três ponteiros:

1.  O _ponteiro de início_ , sempre aponta para o elemento mais baixo do buffer.
2.  O _ponteiro seguinte_ , aponta para o elemento que é o próximo candidato para leitura ou escrita.
3.  O _ponteiro de fim_ , aponta para uma posição após o final do buffer.

Um objeto `basic_streambuf` pode suportar entrada (caso em que o buffer descrito pelos ponteiros de início, seguinte e fim é chamado de _get area_), saída (_put area_), ou entrada e saída simultaneamente. Neste último caso, seis ponteiros são rastreados, os quais podem todos apontar para elementos do mesmo array de caracteres ou para dois arrays individuais.

Se o ponteiro seguinte for menor que o ponteiro de fim na _put area_, uma _posição de escrita_ está disponível. O ponteiro seguinte pode ser desreferenciado e atribuído.

Se o ponteiro seguinte for menor que o ponteiro de fim na _get area_, uma _posição de leitura_ está disponível. O ponteiro seguinte pode ser desreferenciado e lido.

Se o ponteiro seguinte for maior que o ponteiro de início em uma _get area_, uma _posição de putback_ está disponível, e o ponteiro seguinte pode ser decrementado, desreferenciado e atribuído, a fim de colocar um caractere de volta na _get area_.

A representação e codificação de caracteres na sequência controlada podem ser diferentes das representações de caracteres na sequência associada, caso em que uma _facet_ de _locale_ [std::codecvt](<#/doc/locale/codecvt>) é tipicamente usada para realizar a conversão. Exemplos comuns são arquivos UTF-8 (ou outros multibyte) acessados através de objetos [std::wfstream](<#/doc/io/basic_fstream>): a sequência controlada consiste em caracteres `wchar_t`, mas a sequência associada consiste em bytes.

Uma implementação típica da classe base `std::basic_streambuf` mantém apenas os seis ponteiros `CharT*` e uma cópia de [std::locale](<#/doc/locale/locale>) como membros de dados. Além disso, as implementações podem manter cópias em cache de _facets_ de _locale_, que são invalidadas sempre que `imbue()` é chamado. Os buffers concretos, como [std::basic_filebuf](<#/doc/io/basic_filebuf>) ou [std::basic_stringbuf](<#/doc/io/basic_stringbuf>), são derivados de `std::basic_streambuf`.

Vários typedefs para tipos de caracteres comuns são fornecidos:

Definido no cabeçalho `[<streambuf>](<#/doc/header/streambuf>)`
---
Tipo | Definição
---|---
`std::streambuf` | `std::basic_streambuf<char>`
`std::wstreambuf` | `std::basic_streambuf<wchar_t>`

### Tipos de membro

Tipo de membro | Definição
---|---
`char_type` | `CharT`
`traits_type` | `Traits`; o programa é malformado se `Traits::char_type` não for `CharT`.
`int_type` | `Traits::int_type`
`pos_type` | `Traits::pos_type`
`off_type` | `Traits::off_type`

### Funções membro

[ (destrutor)](<#/doc/io/basic_streambuf/~basic_streambuf>)[virtual] | destrói o objeto `basic_streambuf`
(função membro pública virtual)

##### Locales

[ pubimbue](<#/doc/io/basic_streambuf/pubimbue>) | altera o locale associado e invoca imbue()
(função membro pública)
[ getloc](<#/doc/io/basic_streambuf/getloc>) | obtém uma cópia do locale associado
(função membro pública)

##### Posicionamento

[ pubsetbuf](<#/doc/io/basic_streambuf/pubsetbuf>) | invoca setbuf()
(função membro pública)
[ pubseekoff](<#/doc/io/basic_streambuf/pubseekoff>) | invoca seekoff()
(função membro pública)
[ pubseekpos](<#/doc/io/basic_streambuf/pubseekpos>) | invoca seekpos()
(função membro pública)
[ pubsync](<#/doc/io/basic_streambuf/pubsync>) | invoca sync()
(função membro pública)

##### Get area

[ in_avail](<#/doc/io/basic_streambuf/in_avail>) | obtém o número de caracteres imediatamente disponíveis na get area
(função membro pública)
[ snextc](<#/doc/io/basic_streambuf/snextc>) | avança a sequência de entrada, então lê um caractere sem avançar novamente
(função membro pública)
[ sbumpc](<#/doc/io/basic_streambuf/sbumpc>)(removido em C++17) | lê um caractere da sequência de entrada e avança a sequência
(função membro pública)
[ sgetc](<#/doc/io/basic_streambuf/sgetc>) | lê um caractere da sequência de entrada sem avançar a sequência
(função membro pública)
[ sgetn](<#/doc/io/basic_streambuf/sgetn>) | invoca xsgetn()
(função membro pública)

##### Put area

[ sputc](<#/doc/io/basic_streambuf/sputc>) | escreve um caractere na put area e avança o ponteiro seguinte
(função membro pública)
[ sputn](<#/doc/io/basic_streambuf/sputn>) | invoca xsputn()
(função membro pública)

##### Putback

[ sputbackc](<#/doc/io/basic_streambuf/sputbackc>) | coloca um caractere de volta na sequência de entrada
(função membro pública)
[ sungetc](<#/doc/io/basic_streambuf/sungetc>) | move o ponteiro seguinte na sequência de entrada uma posição para trás
(função membro pública)

### Funções membro protegidas

[ (construtor)](<#/doc/io/basic_streambuf/basic_streambuf>) | constrói um objeto `basic_streambuf`
(função membro protegida)
[ operator=](<#/>)(C++11) | substitui um objeto `basic_streambuf`
(função membro protegida)
[ swap](<#/doc/io/basic_streambuf/swap>)(C++11) | troca dois objetos `basic_streambuf`
(função membro protegida)

##### Locales

[ imbue](<#/doc/io/basic_streambuf/pubimbue>)[virtual] | reage a uma mudança do locale associado
(função membro protegida virtual)

##### Posicionamento

[ setbuf](<#/doc/io/basic_streambuf/pubsetbuf>)[virtual] | substitui o buffer por um array definido pelo usuário, se permitido
(função membro protegida virtual)
[ seekoff](<#/doc/io/basic_streambuf/pubseekoff>)[virtual] | reposiciona o ponteiro seguinte na sequência de entrada, sequência de saída, ou ambas, usando endereçamento relativo
(função membro protegida virtual)
[ seekpos](<#/doc/io/basic_streambuf/pubseekpos>)[virtual] | reposiciona o ponteiro seguinte na sequência de entrada, sequência de saída, ou ambas, usando endereçamento absoluto
(função membro protegida virtual)
[ sync](<#/doc/io/basic_streambuf/pubsync>)[virtual] | sincroniza os buffers com a sequência de caracteres associada
(função membro protegida virtual)

##### Get area

[ showmanyc](<#/doc/io/basic_streambuf/showmanyc>)[virtual] | obtém o número de caracteres disponíveis para entrada na sequência de entrada associada, se conhecido
(função membro protegida virtual)
[ underflow](<#/doc/io/basic_streambuf/underflow>)[virtual] | lê caracteres da sequência de entrada associada para a get area
(função membro protegida virtual)
[ uflow](<#/doc/io/basic_streambuf/uflow>)[virtual] | lê caracteres da sequência de entrada associada para a get area e avança o ponteiro seguinte
(função membro protegida virtual)
[ xsgetn](<#/doc/io/basic_streambuf/sgetn>)[virtual] | lê múltiplos caracteres da sequência de entrada
(função membro protegida virtual)
[ ebackgptregptr](<#/doc/io/basic_streambuf/gptr>) | retorna um ponteiro para o início, caractere atual e o fim da get area
(função membro protegida)
[ gbump](<#/doc/io/basic_streambuf/gbump>) | avança o ponteiro seguinte na sequência de entrada
(função membro protegida)
[ setg](<#/doc/io/basic_streambuf/setg>) | reposiciona os ponteiros de início, seguinte e fim da sequência de entrada
(função membro protegida)

##### Put area

[ xsputn](<#/doc/io/basic_streambuf/sputn>)[virtual] | escreve múltiplos caracteres na sequência de saída
(função membro protegida virtual)
[ overflow](<#/doc/io/basic_streambuf/overflow>)[virtual] | escreve caracteres na sequência de saída associada a partir da put area
(função membro protegida virtual)
[ pbasepptrepptr](<#/doc/io/basic_streambuf/pptr>) | retorna um ponteiro para o início, caractere atual e o fim da put area
(função membro protegida)
[ pbump](<#/doc/io/basic_streambuf/pbump>) | avança o ponteiro seguinte da sequência de saída
(função membro protegida)
[ setp](<#/doc/io/basic_streambuf/setp>) | reposiciona os ponteiros de início, seguinte e fim da sequência de saída
(função membro protegida)

##### Putback

[ pbackfail](<#/doc/io/basic_streambuf/pbackfail>)[virtual] | coloca um caractere de volta na sequência de entrada, possivelmente modificando a sequência de entrada
(função membro protegida virtual)

### Ver também

[ FILE](<#/doc/io/c/FILE>) | tipo de objeto, capaz de conter todas as informações necessárias para controlar um stream de E/S C
(typedef)