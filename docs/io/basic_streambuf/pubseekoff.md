# std::basic_streambuf&lt;CharT,Traits&gt;::pubseekoff, std::basic_streambuf&lt;CharT,Traits&gt;::seekoff

```cpp
pos_type pubseekoff( off_type off, std::ios_base::seekdir dir,
std::ios_base::openmode which = ios_base::in | ios_base::out );  // (1)
protected:
virtual pos_type seekoff( off_type off, std::ios_base::seekdir dir,
std::ios_base::openmode which = ios_base::in | ios_base::out );  // (2)
```

  
Define o indicador de posição da sequência de entrada e/ou saída em relação a alguma outra posição.

1) Chama seekoff(off, dir, which) da classe mais derivada.

2) A versão da classe base desta função não tem efeito. As classes derivadas podem sobrescrever esta função para permitir o posicionamento relativo do indicador de posição.

### Parâmetros

off  |  \-  |  posição relativa para definir o indicador de posição.   
---|---
dir  |  \-  |  define a posição base para aplicar o deslocamento relativo. Pode ser uma das seguintes constantes:  |  Constante  |  Explicação   
[`beg`](<#/doc/io/ios_base/seekdir>) |  o início de um stream   
[`end`](<#/doc/io/ios_base/seekdir>) |  o fim de um stream   
[`cur`](<#/doc/io/ios_base/seekdir>) |  a posição atual do indicador de posição do stream   
which  |  \-  |  define qual das sequências de entrada e/ou saída afetar. Pode ser uma ou uma combinação das seguintes constantes:  |  Constante  |  Explicação   
[`in`](<#/doc/io/ios_base/openmode>) |  afeta a sequência de entrada   
[`out`](<#/doc/io/ios_base/openmode>) |  afeta a sequência de saída   
  
### Nota

Nem todas as combinações de parâmetros podem ser válidas, consulte as versões derivadas de `seekoff` para detalhes.

### Valor de retorno

1) O valor de retorno de seekoff(off, dir, which)

2) A posição absoluta resultante conforme definida pelo indicador de posição. A versão da classe base retorna pos_type(off_type(-1)).

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 55](<https://cplusplus.github.io/LWG/issue55>) | C++98  | a versão da classe base de `seekoff` retornava uma posição de stream inválida indefinida  | retorna pos_type(off_type(-1))  
  
### Ver também

[ pubseekpos](<#/doc/io/basic_streambuf/pubseekpos>) |  invoca seekpos()   
(função membro pública)  
[ seekoff](<#/doc/io/basic_filebuf/seekoff>)[virtual] |  reposiciona a posição do arquivo, usando endereçamento relativo   
(função membro protegida virtual de `std::basic_filebuf<CharT,Traits>`)  
[ seekoff](<#/doc/io/basic_stringbuf/seekoff>)[virtual] |  reposiciona o próximo ponteiro na sequência de entrada, sequência de saída, ou ambas, usando endereçamento relativo   
(função membro protegida virtual de `std::basic_stringbuf<CharT,Traits,Allocator>`)  
[ seekoff](<#/doc/io/strstreambuf/seekoff>)[virtual] |  reposiciona o próximo ponteiro na sequência de entrada, sequência de saída, ou ambas, usando endereçamento relativo   
(função membro protegida virtual de `std::strstreambuf`)