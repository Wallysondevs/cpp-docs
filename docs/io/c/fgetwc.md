# std::fgetwc

Definido no cabeçalho `[<cwchar>](<#/doc/header/cwchar>)`

```c
std::wint_t fgetwc( std::FILE* stream );
std::wint_t getwc( std::FILE* stream );
```

Lê o próximo caractere largo do stream de entrada fornecido. getwc() pode ser implementado como uma macro e pode avaliar `stream` mais de uma vez.

### Parâmetros

- **stream** — de onde ler o caractere largo

### Valor de retorno

O próximo caractere largo do stream ou WEOF se um erro ocorreu ou o fim do arquivo foi atingido. Se um erro de codificação ocorreu, [errno](<#/doc/error/errno>) é definido como [EILSEQ](<#/doc/error/errno_macros>).

### Veja também

[ fgetcgetc](<#/doc/io/c/fgetc>) | obtém um caractere de um stream de arquivo
(função)
[ fgetws](<#/doc/io/c/fgetws>) | obtém uma string larga de um stream de arquivo
(função)
[ fputwcputwc](<#/doc/io/c/fputwc>) | escreve um caractere largo em um stream de arquivo
(função)
[ ungetwc](<#/doc/io/c/ungetwc>) | coloca um caractere largo de volta em um stream de arquivo
(função)
[Documentação C](<#/>) para fgetwc