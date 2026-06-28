# std::getwchar

Definido no header `[<cwchar>](<#/doc/header/cwchar>)`

```cpp
std::wint_t getwchar();
```

  
Lê o próximo caractere wide de [stdin](<#/doc/io/c/std_streams>). 

### Parâmetros

(nenhum) 

### Valor de retorno

O caractere wide obtido, ou WEOF se um erro ocorreu ou o fim do arquivo foi atingido. 

### Veja também

[ getchar](<#/doc/io/c/getchar>) |  lê um caractere de [stdin](<#/doc/io/c/std_streams>)   
(função)  
[ fgetwcgetwc](<#/doc/io/c/fgetwc>) |  obtém um caractere wide de um stream de arquivo   
(função)  
[Documentação C](<#/>) para getwchar