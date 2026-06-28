# std::basic_streambuf&lt;CharT,Traits&gt;::pubseekpos, std::basic_streambuf&lt;CharT,Traits&gt;::seekpos

```cpp
pos_type pubseekpos( pos_type pos,
std::ios_base::openmode which = std::ios_base::in | std::ios_base::out );  // (1)
protected:
virtual pos_type seekpos( pos_type pos,
std::ios_base::openmode which = std::ios_base::in | std::ios_base::out );  // (2)
```

Define o indicador de posição da sequência de entrada e/ou saída para uma posição absoluta.

1) Chama seekpos(pos, which) da classe mais derivada.

2) A versão da classe base desta função não tem efeito. As classes derivadas podem sobrescrever esta função para permitir o posicionamento absoluto do indicador de posição.

### Parâmetros

- **pos** — posição absoluta para definir o indicador de posição
- **which** — define qual das sequências de entrada e/ou saída afetar. Pode ser uma ou uma combinação das seguintes constantes: | Constante | Explicação
---|---
[`in`](<#/doc/io/ios_base/openmode>) | afeta a sequência de entrada
[`out`](<#/doc/io/ios_base/openmode>) | afeta a sequência de saída

### Valor de retorno

1) O valor de retorno de seekpos(pos, which).

2) A posição absoluta resultante conforme definida pelo indicador de posição. A versão da classe base retorna pos_type(off_type(-1)).

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
[LWG 55](<https://cplusplus.github.io/LWG/issue55>) | C++98 | a versão da classe base de `seekpos` retornava
uma posição de stream inválida indefinida | retorna pos_type(off_type(-1))

### Veja também

[ pubseekoff](<#/doc/io/basic_streambuf/pubseekoff>) | invoca seekoff()
(função membro pública)
[ seekpos](<#/doc/io/basic_filebuf/seekpos>)[virtual] | reposiciona a posição do arquivo, usando endereçamento absoluto
(função membro virtual protegida de `std::basic_filebuf<CharT,Traits>`)
[ seekpos](<#/doc/io/basic_stringbuf/seekpos>)[virtual] | reposiciona o próximo ponteiro na sequência de entrada, sequência de saída, ou ambos usando endereçamento absoluto
(função membro virtual protegida de `std::basic_stringbuf<CharT,Traits,Allocator>`)
[ seekpos](<#/doc/io/strstreambuf/seekpos>)[virtual] | reposiciona o próximo ponteiro na sequência de entrada, sequência de saída, ou ambos usando endereçamento absoluto
(função membro virtual protegida de `std::strstreambuf`)