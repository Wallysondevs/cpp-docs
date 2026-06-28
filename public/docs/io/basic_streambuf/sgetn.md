# std::basic_streambuf&lt;CharT,Traits&gt;::sgetn, std::basic_streambuf&lt;CharT,Traits&gt;::xsgetn

```cpp
std::streamsize sgetn( char_type* s, std::streamsize count );  // (1)
protected:
virtual std::streamsize xsgetn( char_type* s, std::streamsize count );  // (2)
```

  
1) Chama `xsgetn(s, count)` da classe mais derivada.

2) Lê `count` caracteres da sequência de entrada e os armazena em um array de caracteres apontado por `s`. Os caracteres são lidos como se por chamadas repetidas a [sbumpc()](<#/doc/io/basic_streambuf/sbumpc>). Ou seja, se menos de `count` caracteres estiverem imediatamente disponíveis, a função chama [uflow()](<#/doc/io/basic_streambuf/uflow>) para fornecer mais até que `Traits::eof()` seja retornado.

Classes derivadas de `std::basic_streambuf` têm permissão para fornecer implementações mais eficientes desta função.

### Parâmetros

s  |  \-  |  ponteiro para o início de um array de char_type   
---|---|---
count  |  \-  |  número máximo de caracteres a serem lidos.   
  
### Valor de retorno

O número de caracteres lidos com sucesso. Se for menor que `count`, a sequência de entrada atingiu o fim. 

### Observações

A regra sobre "implementações mais eficientes" permite E/S em massa sem buffer intermediário: é assim que [std::ifstream::read](<#/doc/io/basic_istream/read>) simplesmente passa o ponteiro para a chamada de sistema POSIX `read()` em algumas implementações de iostreams.

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ sputn](<#/doc/io/basic_streambuf/sputn>) |  invoca xsputn()   
(função membro pública)  