# std::text_encoding::environment

```cpp
static text_encoding environment();  // (desde C++26)
```

  
Constrói um novo objeto `text_encoding` que representa a codificação do ambiente e que se refere ao esquema de codificação de caracteres definido pela implementação do ambiente de execução. O ambiente de execução em tempo de execução é o [ambiente](<#/doc/language/main_function>) no qual o programa é executado. 

A codificação do ambiente no ambiente de execução é distinta da codificação do [conjunto de caracteres de execução](<#/doc/language/charset>), que é específica da localidade (locale-specific). Em outras palavras, a codificação do ambiente permanece independente da localidade (locale-independent), ou seja, o valor retornado por `environment()` não é afetado por chamadas às funções (por exemplo, [std::setlocale](<#/doc/locale/setlocale>) e a função POSIX [`setenv()`](<https://pubs.opengroup.org/onlinepubs/9699919799/functions/setenv.html>)) que podem modificar o ambiente. 

Esta função é deletada a menos que [CHAR_BIT](<#/doc/types/climits>) seja 8. 

### Parâmetros

(nenhum) 

### Valor de retorno

O objeto que contém a representação da codificação de caracteres do ambiente. 

### Observações

A codificação do ambiente pode diferir da codificação global associada à localidade que é acessível via [std::locale](<#/doc/locale/locale>)().encoding(). 

Em plataformas Windows, a codificação do ambiente pode ser determinada por [`GetACP()`](<https://learn.microsoft.com/en-us/windows/win32/api/winnls/nf-winnls-getacp>) e então mapeada para valores MIBenum. 

Em plataformas POSIX, a codificação do ambiente está associada à localidade POSIX "" que pode ser implementada para corresponder a um valor de [`nl_langinfo_l()`](<https://pubs.opengroup.org/onlinepubs/9699919799/functions/nl_langinfo.html>) quando a localidade do ambiente "" é definida antes que a [localidade C++ global](<#/doc/locale/locale/global>) seja definida como "C" na inicialização do programa. 

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ encoding](<#/doc/locale/locale/encoding>)(C++26) | retorna o esquema de codificação de caracteres associado à localidade   
(função membro pública de `std::locale`)  