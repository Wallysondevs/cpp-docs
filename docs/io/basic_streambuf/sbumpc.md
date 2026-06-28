# std::basic_streambuf&lt;CharT,Traits&gt;::sbumpc, std::basic_streambuf&lt;CharT,Traits&gt;::stossc

```cpp
int_type sbumpc();  // (1)
void stossc(); |  (2)  |  (obsoleto em C++98)
(removido em C++17)
```

  
Lê um caractere e avança a sequência de entrada em um caractere.

1) Se a posição de leitura da sequência de entrada não estiver disponível, retorna [uflow()](<#/doc/io/basic_streambuf/uflow>). Caso contrário, retorna Traits::to_int_type(*gptr()).

2) O mesmo que (1), mas descarta o resultado.

### Parâmetros

(nenhum) 

### Valor de retorno

1) O valor do caractere apontado pelo _get pointer_, ou Traits::eof() se a posição de leitura não estiver disponível.

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ sgetc](<#/doc/io/basic_streambuf/sgetc>) |  lê um caractere da sequência de entrada sem avançar a sequência   
(função membro pública)  
[ snextc](<#/doc/io/basic_streambuf/snextc>) |  avança a sequência de entrada, então lê um caractere sem avançar novamente   
(função membro pública)