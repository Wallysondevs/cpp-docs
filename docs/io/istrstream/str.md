# std::istrstream::str

char* str(); | | (obsoleto desde C++98)
(removido em C++26)

Retorna o ponteiro para o início do buffer, após congelá-lo. Efetivamente chama rdbuf()->str().

### Parâmetros

(nenhum)

### Valor de retorno

Ponteiro para o início do buffer no [std::strstreambuf](<#/doc/io/strstreambuf>) associado ou um ponteiro nulo se nenhum buffer estiver disponível.

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo