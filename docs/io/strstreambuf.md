# std::strstreambuf

Definido no cabeçalho `[<strstream>](<#/doc/header/strstream>)`

```c
class strstreambuf : public std::basic_streambuf<char>
(removido em C++26)
```

`std::strstreambuf` é um [std::basic_streambuf](<#/doc/io/basic_streambuf>) cuja sequência de caracteres associada é um array de caracteres, que pode ser constante (por exemplo, um literal de string), modificável mas não dinâmico (por exemplo, um array alocado na pilha), ou dinâmico, caso em que o `std::strstreambuf` pode ter permissão para realocar o array conforme necessário para acomodar a saída (por exemplo, chamando delete[] e new[] ou funções fornecidas pelo usuário).

Uma implementação típica de um `std::strstreambuf` mantém quatro membros de dados privados:

1) estado do buffer, um tipo bitmask que pode representar qualquer combinação dos quatro valores "alocado" (o destrutor irá desalocar), "constante" (saída não permitida), "dinâmico" (a saída pode realocar), ou "congelado" (desalocação e realocação não são permitidas)

2) tamanho do buffer alocado (o início do buffer não precisa de um membro de dados especial, ele pode ser armazenado no ponteiro herdado [eback()](<#/doc/io/basic_streambuf/gptr>))

3) ponteiro para função de alocação fornecida pelo usuário

4) ponteiro para função de desalocação fornecida pelo usuário.

### Observações

Após qualquer chamada a [str()](<#/doc/io/strstreambuf/str>) em um stream com um buffer dinâmico, uma chamada a [freeze(false)](<#/doc/io/strstreambuf/freeze>) é necessária para permitir que o destrutor de `strstreambuf` desaloca o buffer quando necessário.

`strstreambuf` foi obsoleto desde C++98 e removido desde C++26. A substituição recomendada é [`std::spanbuf`](<#/doc/io/basic_spanbuf>)(desde C++23).

### Funções membro

### Funções membro públicas

---
[ (construtor)](<#/doc/io/strstreambuf/strstreambuf>) | constrói um objeto `strstreambuf`
(função membro pública)
[ (destrutor)](<#/doc/io/strstreambuf/~strstreambuf>)[virtual] | destrói um objeto `strstreambuf`, opcionalmente desalocando o array de caracteres
(função membro pública virtual)
[ freeze](<#/doc/io/strstreambuf/freeze>) | define/limpa o estado congelado do buffer
(função membro pública)
[ str](<#/doc/io/strstreambuf/str>) | marca o buffer como congelado e retorna o ponteiro inicial da sequência de entrada
(função membro pública)
[ pcount](<#/doc/io/strstreambuf/pcount>) | retorna o ponteiro seguinte menos o ponteiro inicial na sequência de saída: o número de caracteres escritos
(função membro pública)

### Funções membro protegidas

[ underflow](<#/doc/io/strstreambuf/underflow>)[virtual] | lê um caractere da sequência de entrada sem avançar o ponteiro seguinte
(função membro protegida virtual)
[ pbackfail](<#/doc/io/strstreambuf/pbackfail>)[virtual] | retrocede a sequência de entrada para retornar um caractere
(função membro protegida virtual)
[ overflow](<#/doc/io/strstreambuf/overflow>)[virtual] | anexa um caractere à sequência de saída, pode realocar ou alocar inicialmente o buffer se dinâmico e não congelado
(função membro protegida virtual)
[ setbuf](<#/doc/io/strstreambuf/setbuf>)[virtual] | tenta substituir a sequência de caracteres controlada por um array
(função membro protegida virtual)
[ seekoff](<#/doc/io/strstreambuf/seekoff>)[virtual] | reposiciona o ponteiro seguinte na sequência de entrada, sequência de saída, ou ambas, usando endereçamento relativo
(função membro protegida virtual)
[ seekpos](<#/doc/io/strstreambuf/seekpos>)[virtual] | reposiciona o ponteiro seguinte na sequência de entrada, sequência de saída, ou ambas, usando endereçamento absoluto
(função membro protegida virtual)

## Herdado de [std::basic_streambuf](<#/doc/io/basic_streambuf>)

### Tipos membro

Tipo membro | Definição
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

##### Área de leitura

[ in_avail](<#/doc/io/basic_streambuf/in_avail>) | obtém o número de caracteres imediatamente disponíveis na área de leitura
(função membro pública de `std::basic_streambuf<CharT,Traits>`)
[ snextc](<#/doc/io/basic_streambuf/snextc>) | avança a sequência de entrada, então lê um caractere sem avançar novamente
(função membro pública de `std::basic_streambuf<CharT,Traits>`)
[ sbumpcstossc](<#/doc/io/basic_streambuf/sbumpc>)(removido em C++17) | lê um caractere da sequência de entrada e avança a sequência
(função membro pública de `std::basic_streambuf<CharT,Traits>`)
[ sgetc](<#/doc/io/basic_streambuf/sgetc>) | lê um caractere da sequência de entrada sem avançar a sequência
(função membro pública de `std::basic_streambuf<CharT,Traits>`)
[ sgetn](<#/doc/io/basic_streambuf/sgetn>) | invoca xsgetn()
(função membro pública de `std::basic_streambuf<CharT,Traits>`)

##### Área de escrita

[ sputc](<#/doc/io/basic_streambuf/sputc>) | escreve um caractere na área de escrita e avança o ponteiro seguinte
(função membro pública de `std::basic_streambuf<CharT,Traits>`)
[ sputn](<#/doc/io/basic_streambuf/sputn>) | invoca xsputn()
(função membro pública de `std::basic_streambuf<CharT,Traits>`)

##### Retorno

[ sputbackc](<#/doc/io/basic_streambuf/sputbackc>) | coloca um caractere de volta na sequência de entrada
(função membro pública de `std::basic_streambuf<CharT,Traits>`)
[ sungetc](<#/doc/io/basic_streambuf/sungetc>) | move o ponteiro seguinte na sequência de entrada para trás em uma posição
(função membro pública de `std::basic_streambuf<CharT,Traits>`)

### Funções membro protegidas

[ (construtor)](<#/doc/io/basic_streambuf/basic_streambuf>) | constrói um objeto `basic_streambuf`
(função membro protegida)
[ operator=](<#/>)(C++11) | substitui um objeto `basic_streambuf`
(função membro protegida)
[ swap](<#/doc/io/basic_streambuf/swap>)(C++11) | troca dois objetos `basic_streambuf`
(função membro protegida)

##### Locales

[ imbue](<#/doc/io/basic_streambuf/pubimbue>)[virtual] | reage a uma mudança do locale associado
(função membro protegida virtual de `std::basic_streambuf<CharT,Traits>`)

##### Posicionamento

[ setbuf](<#/doc/io/basic_streambuf/pubsetbuf>)[virtual] | substitui o buffer por um array definido pelo usuário, se permitido
(função membro protegida virtual de `std::basic_streambuf<CharT,Traits>`)
[ seekoff](<#/doc/io/basic_streambuf/pubseekoff>)[virtual] | reposiciona o ponteiro seguinte na sequência de entrada, sequência de saída, ou ambas, usando endereçamento relativo
(função membro protegida virtual de `std::basic_streambuf<CharT,Traits>`)
[ seekpos](<#/doc/io/basic_streambuf/pubseekpos>)[virtual] | reposiciona o ponteiro seguinte na sequência de entrada, sequência de saída, ou ambas, usando endereçamento absoluto
(função membro protegida virtual de `std::basic_streambuf<CharT,Traits>`)
[ sync](<#/doc/io/basic_streambuf/pubsync>)[virtual] | sincroniza os buffers com a sequência de caracteres associada
(função membro protegida virtual de `std::basic_streambuf<CharT,Traits>`)

##### Área de leitura

[ showmanyc](<#/doc/io/basic_streambuf/showmanyc>)[virtual] | obtém o número de caracteres disponíveis para entrada na sequência de entrada associada, se conhecido
(função membro protegida virtual de `std::basic_streambuf<CharT,Traits>`)
[ underflow](<#/doc/io/basic_streambuf/underflow>)[virtual] | lê caracteres da sequência de entrada associada para a área de leitura
(função membro protegida virtual de `std::basic_streambuf<CharT,Traits>`)
[ uflow](<#/doc/io/basic_streambuf/uflow>)[virtual] | lê caracteres da sequência de entrada associada para a área de leitura e avança o ponteiro seguinte
(função membro protegida virtual de `std::basic_streambuf<CharT,Traits>`)
[ xsgetn](<#/doc/io/basic_streambuf/sgetn>)[virtual] | lê múltiplos caracteres da sequência de entrada
(função membro protegida virtual de `std::basic_streambuf<CharT,Traits>`)
[ ebackgptregptr](<#/doc/io/basic_streambuf/gptr>) | retorna um ponteiro para o início, caractere atual e o fim da área de leitura
(função membro protegida)
[ gbump](<#/doc/io/basic_streambuf/gbump>) | avança o ponteiro seguinte na sequência de entrada
(função membro protegida)
[ setg](<#/doc/io/basic_streambuf/setg>) | reposiciona os ponteiros de início, seguinte e fim da sequência de entrada
(função membro protegida)

##### Área de escrita

[ xsputn](<#/doc/io/basic_streambuf/sputn>)[virtual] | escreve múltiplos caracteres na sequência de saída
(função membro protegida virtual de `std::basic_streambuf<CharT,Traits>`)
[ overflow](<#/doc/io/basic_streambuf/overflow>)[virtual] | escreve caracteres da sequência de saída associada para a área de escrita
(função membro protegida virtual de `std::basic_streambuf<CharT,Traits>`)
[ pbasepptrepptr](<#/doc/io/basic_streambuf/pptr>) | retorna um ponteiro para o início, caractere atual e o fim da área de escrita
(função membro protegida)
[ pbump](<#/doc/io/basic_streambuf/pbump>) | avança o ponteiro seguinte da sequência de saída
(função membro protegida)
[ setp](<#/doc/io/basic_streambuf/setp>) | reposiciona os ponteiros de início, seguinte e fim da sequência de saída
(função membro protegida)

##### Retorno

[ pbackfail](<#/doc/io/basic_streambuf/pbackfail>)[virtual] | coloca um caractere de volta na sequência de entrada, possivelmente modificando a sequência de entrada
(função membro protegida virtual de `std::basic_streambuf<CharT,Traits>`)