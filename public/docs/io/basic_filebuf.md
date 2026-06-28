# std::basic_filebuf

Definido no cabeçalho `[<fstream>](<#/doc/header/fstream>)`

```c
template<
class CharT,
class Traits = std::char_traits<CharT>
> class basic_filebuf : public std::basic_streambuf<CharT, Traits>
```

`std::basic_filebuf` é um [std::basic_streambuf](<#/doc/io/basic_streambuf>) cuja sequência de caracteres associada é um arquivo. Tanto a sequência de entrada quanto a sequência de saída estão associadas ao mesmo arquivo, e uma posição de arquivo conjunta é mantida para ambas as operações. As restrições na leitura e escrita de uma sequência com `std::basic_filebuf` são as mesmas que as de [std::FILE](<#/doc/io/c/FILE>).

As funções [underflow()](<#/doc/io/basic_streambuf/underflow>) e [overflow()](<#/doc/io/basic_streambuf/overflow>) / [sync()](<#/doc/io/basic_streambuf/pubsync>) realizam a E/S real entre o arquivo e as áreas de leitura (get) e escrita (put) do buffer. Quando `CharT` não é char, a maioria das implementações armazena caracteres multibyte no arquivo e uma facet [std::codecvt](<#/doc/locale/codecvt>) é usada para realizar a conversão de caracteres wide/multibyte.

Vários typedefs para tipos de caracteres comuns são fornecidos:

Definido no cabeçalho `[<fstream>](<#/doc/header/fstream>)`
---
Tipo | Definição
---|---
`std::filebuf` | std::basic_filebuf&lt;char&gt;
`std::wfilebuf` | std::basic_filebuf<wchar_t>

### Tipos de membros

Tipo | Definição
---|---
`char_type` | `CharT`
`traits_type` | `Traits`; o programa é malformado se `Traits::char_type` não for `CharT`.
`int_type` | `Traits::int_type`
`pos_type` | `Traits::pos_type` que é exigido ser [std::fpos](<#/doc/io/fpos>)<Traits::state_type>
`off_type` | `Traits::off_type`
`native_handle_type`(C++26) | tipo _definido pela implementação_ que é [TriviallyCopyable](<#/doc/named_req/TriviallyCopyable>) e [`semiregular`](<#/doc/concepts/semiregular>)

### Funções membro

### Funções membro públicas

---
[ (construtor)](<#/doc/io/basic_filebuf/basic_filebuf>) | constrói um objeto `basic_filebuf`
(função membro pública)
[ operator=](<#/>)(desde C++11) | atribui um objeto `basic_filebuf`
(função membro pública)
[ swap](<#/doc/io/basic_filebuf/swap>)(desde C++11) | troca dois objetos `basic_filebuf`
(função membro pública)
[ native_handle](<#/doc/io/basic_filebuf/native_handle>)(C++26) | retorna o handle subjacente definido pela implementação
(função membro pública)
[ (destrutor)](<#/doc/io/basic_filebuf/~basic_filebuf>)[virtual] | destrói um objeto `basic_filebuf` e fecha o arquivo se estiver aberto
(função membro pública virtual)
[ is_open](<#/doc/io/basic_filebuf/is_open>) | verifica se o arquivo associado está aberto
(função membro pública)
[ open](<#/doc/io/basic_filebuf/open>) | abre um arquivo e o configura como a sequência de caracteres associada
(função membro pública)
[ close](<#/doc/io/basic_filebuf/close>) | descarrega o buffer da área de escrita (put) e fecha o arquivo associado
(função membro pública)

### Funções membro protegidas

[ showmanyc](<#/doc/io/basic_filebuf/showmanyc>)[virtual] | opcionalmente fornece o número de caracteres disponíveis para entrada do arquivo
(função membro protegida virtual)
[ underflow](<#/doc/io/basic_filebuf/underflow>)[virtual] | lê do arquivo associado
(função membro protegida virtual)
[ uflow](<#/doc/io/basic_filebuf/uflow>)[virtual] | lê do arquivo associado e avança o próximo ponteiro na área de leitura (get)
(função membro protegida virtual)
[ pbackfail](<#/doc/io/basic_filebuf/pbackfail>)[virtual] | retrocede a sequência de entrada para "desfazer a leitura" de um caractere, sem afetar o arquivo associado
(função membro protegida virtual)
[ overflow](<#/doc/io/basic_filebuf/overflow>)[virtual] | escreve caracteres no arquivo associado a partir da área de escrita (put)
(função membro protegida virtual)
[ setbuf](<#/doc/io/basic_filebuf/setbuf>)[virtual] | fornece um buffer fornecido pelo usuário ou torna este filebuf sem buffer
(função membro protegida virtual)
[ seekoff](<#/doc/io/basic_filebuf/seekoff>)[virtual] | reposiciona a posição do arquivo, usando endereçamento relativo
(função membro protegida virtual)
[ seekpos](<#/doc/io/basic_filebuf/seekpos>)[virtual] | reposiciona a posição do arquivo, usando endereçamento absoluto
(função membro protegida virtual)
[ sync](<#/doc/io/basic_filebuf/sync>)[virtual] | escreve caracteres no arquivo associado a partir da área de escrita (put)
(função membro protegida virtual)
[ imbue](<#/doc/io/basic_filebuf/imbue>)[virtual] | altera o locale associado
(função membro protegida virtual)

### Funções não-membro

[ std::swap(std::basic_filebuf)](<#/doc/io/basic_filebuf/swap2>)(desde C++11) | especializa o algoritmo [std::swap](<#/doc/utility/swap>)
(modelo de função)

## Herdado de [std::basic_streambuf](<#/doc/io/basic_streambuf>)

### Tipos de membros

Tipo de membro | Definição
---|---
`char_type` | `CharT`
`traits_type` | `Traits`; o programa é malformado se `Traits::char_type` não for `CharT`.
`int_type` | `Traits::int_type`
`pos_type` | `Traits::pos_type`
`off_type` | `Traits::off_type`

### Funções membro

[ (destrutor)](<#/doc/io/basic_streambuf/~basic_streambuf>)[virtual] | destrói o objeto `basic_streambuf`
(função membro pública virtual de `std::basic_streambuf<CharT,Traits>`)

##### Locales

[ pubimbue](<#/doc/io/basic_streambuf/pubimbue>) | altera o locale associado e invoca imbue()
(função membro pública de `std::basic_streambuf<CharT,Traits>`)
[ getloc](<#/doc/io/basic_streambuf/getloc>) | obtém uma cópia do locale associado
(função membro pública de `std::basic_streambuf<CharT,Traits>`)

##### Posicionamento

[ pubsetbuf](<#/doc/io/basic_streambuf/pubsetbuf>) | invoca setbuf()
(função membro pública de `std::basic_streambuf<CharT,Traits>`)
[ pubseekoff](<#/doc/io/basic_streambuf/pubseekoff>) | invoca seekoff()
(função membro pública de `std::basic_streambuf<CharT,Traits>`)
[ pubseekpos](<#/doc/io/basic_streambuf/pubseekpos>) | invoca seekpos()
(função membro pública de `std::basic_streambuf<CharT,Traits>`)
[ pubsync](<#/doc/io/basic_streambuf/pubsync>) | invoca sync()
(função membro pública de `std::basic_streambuf<CharT,Traits>`)

##### Área de leitura (Get area)

[ in_avail](<#/doc/io/basic_streambuf/in_avail>) | obtém o número de caracteres imediatamente disponíveis na área de leitura (get)
(função membro pública de `std::basic_streambuf<CharT,Traits>`)
[ snextc](<#/doc/io/basic_streambuf/snextc>) | avança a sequência de entrada, então lê um caractere sem avançar novamente
(função membro pública de `std::basic_streambuf<CharT,Traits>`)
[ sbumpcstossc](<#/doc/io/basic_streambuf/sbumpc>)(removido em C++17) | lê um caractere da sequência de entrada e avança a sequência
(função membro pública de `std::basic_streambuf<CharT,Traits>`)
[ sgetc](<#/doc/io/basic_streambuf/sgetc>) | lê um caractere da sequência de entrada sem avançar a sequência
(função membro pública de `std::basic_streambuf<CharT,Traits>`)
[ sgetn](<#/doc/io/basic_streambuf/sgetn>) | invoca xsgetn()
(função membro pública de `std::basic_streambuf<CharT,Traits>`)

##### Área de escrita (Put area)

[ sputc](<#/doc/io/basic_streambuf/sputc>) | escreve um caractere na área de escrita (put) e avança o próximo ponteiro
(função membro pública de `std::basic_streambuf<CharT,Traits>`)
[ sputn](<#/doc/io/basic_streambuf/sputn>) | invoca xsputn()
(função membro pública de `std::basic_streambuf<CharT,Traits>`)

##### Retorno (Putback)

[ sputbackc](<#/doc/io/basic_streambuf/sputbackc>) | coloca um caractere de volta na sequência de entrada
(função membro pública de `std::basic_streambuf<CharT,Traits>`)
[ sungetc](<#/doc/io/basic_streambuf/sungetc>) | move o próximo ponteiro na sequência de entrada para trás em um
(função membro pública de `std::basic_streambuf<CharT,Traits>`)

### Funções membro protegidas

[ (construtor)](<#/doc/io/basic_streambuf/basic_streambuf>) | constrói um objeto `basic_streambuf`
(função membro protegida)
[ operator=](<#/>)(desde C++11) | substitui um objeto `basic_streambuf`
(função membro protegida)
[ swap](<#/doc/io/basic_streambuf/swap>)(desde C++11) | troca dois objetos `basic_streambuf`
(função membro protegida)

##### Locales

[ imbue](<#/doc/io/basic_streambuf/pubimbue>)[virtual] | reage a uma mudança do locale associado
(função membro protegida virtual de `std::basic_streambuf<CharT,Traits>`)

##### Posicionamento

[ setbuf](<#/doc/io/basic_streambuf/pubsetbuf>)[virtual] | substitui o buffer por um array definido pelo usuário, se permitido
(função membro protegida virtual de `std::basic_streambuf<CharT,Traits>`)
[ seekoff](<#/doc/io/basic_streambuf/pubseekoff>)[virtual] | reposiciona o próximo ponteiro na sequência de entrada, sequência de saída, ou ambas, usando endereçamento relativo
(função membro protegida virtual de `std::basic_streambuf<CharT,Traits>`)
[ seekpos](<#/doc/io/basic_streambuf/pubseekpos>)[virtual] | reposiciona o próximo ponteiro na sequência de entrada, sequência de saída, ou ambas usando endereçamento absoluto
(função membro protegida virtual de `std::basic_streambuf<CharT,Traits>`)
[ sync](<#/doc/io/basic_streambuf/pubsync>)[virtual] | sincroniza os buffers com a sequência de caracteres associada
(função membro protegida virtual de `std::basic_streambuf<CharT,Traits>`)

##### Área de leitura (Get area)

[ showmanyc](<#/doc/io/basic_streambuf/showmanyc>)[virtual] | obtém o número de caracteres disponíveis para entrada na sequência de entrada associada, se conhecido
(função membro protegida virtual de `std::basic_streambuf<CharT,Traits>`)
[ underflow](<#/doc/io/basic_streambuf/underflow>)[virtual] | lê caracteres da sequência de entrada associada para a área de leitura (get)
(função membro protegida virtual de `std::basic_streambuf<CharT,Traits>`)
[ uflow](<#/doc/io/basic_streambuf/uflow>)[virtual] | lê caracteres da sequência de entrada associada para a área de leitura (get) e avança o próximo ponteiro
(função membro protegida virtual de `std::basic_streambuf<CharT,Traits>`)
[ xsgetn](<#/doc/io/basic_streambuf/sgetn>)[virtual] | lê múltiplos caracteres da sequência de entrada
(função membro protegida virtual de `std::basic_streambuf<CharT,Traits>`)
[ ebackgptregptr](<#/doc/io/basic_streambuf/gptr>) | retorna um ponteiro para o início, caractere atual e o fim da área de leitura (get)
(função membro protegida)
[ gbump](<#/doc/io/basic_streambuf/gbump>) | avança o próximo ponteiro na sequência de entrada
(função membro protegida)
[ setg](<#/doc/io/basic_streambuf/setg>) | reposiciona os ponteiros de início, próximo e fim da sequência de entrada
(função membro protegida)

##### Área de escrita (Put area)

[ xsputn](<#/doc/io/basic_streambuf/sputn>)[virtual] | escreve múltiplos caracteres na sequência de saída
(função membro protegida virtual de `std::basic_streambuf<CharT,Traits>`)
[ overflow](<#/doc/io/basic_streambuf/overflow>)[virtual] | escreve caracteres na sequência de saída associada a partir da área de escrita (put)
(função membro protegida virtual de `std::basic_streambuf<CharT,Traits>`)
[ pbasepptrepptr](<#/doc/io/basic_streambuf/pptr>) | retorna um ponteiro para o início, caractere atual e o fim da área de escrita (put)
(função membro protegida)
[ pbump](<#/doc/io/basic_streambuf/pbump>) | avança o próximo ponteiro da sequência de saída
(função membro protegida)
[ setp](<#/doc/io/basic_streambuf/setp>) | reposiciona os ponteiros de início, próximo e fim da sequência de saída
(função membro protegida)

##### Retorno (Putback)

[ pbackfail](<#/doc/io/basic_streambuf/pbackfail>)[virtual] | coloca um caractere de volta na sequência de entrada, possivelmente modificando a sequência de entrada
(função membro protegida virtual de `std::basic_streambuf<CharT,Traits>`)

### Notas

[Macro de teste de funcionalidade](<#/doc/utility/feature_test>) | Valor | Padrão | Funcionalidade
---|---|---|---
[`__cpp_lib_fstream_native_handle`](<#/doc/feature_test>) | [`202306L`](<#/>) | (C++26) | suporte a handles nativos

### Ver também

[ FILE](<#/doc/io/c/FILE>) | tipo de objeto, capaz de conter todas as informações necessárias para controlar um stream de E/S C
(typedef)