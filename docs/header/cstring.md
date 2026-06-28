# Header da biblioteca padrão &lt;cstring&gt;

Este header estava originalmente na biblioteca padrão C como [`<string.h>`](<#/>).

Este header é para [strings de bytes terminadas em nulo no estilo C](<#/doc/string/byte>).

### Macros

[ NULL](<#/doc/types/NULL>) | constante de ponteiro nulo definida pela implementação
(constante macro)

### Tipos

[ size_t](<#/doc/types/size_t>) | tipo inteiro sem sinal retornado pelo operador [`sizeof`](<#/doc/language/sizeof>)
(typedef)

### Funções

##### Manipulação de strings

---
[ strcpy](<#/doc/string/byte/strcpy>) | copia uma string para outra
(função)
[ strncpy](<#/doc/string/byte/strncpy>) | copia uma certa quantidade de caracteres de uma string para outra
(função)
[ strcat](<#/doc/string/byte/strcat>) | concatena duas strings
(função)
[ strncat](<#/doc/string/byte/strncat>) | concatena uma certa quantidade de caracteres de duas strings
(função)
[ strxfrm](<#/doc/string/byte/strxfrm>) | transforma uma string para que `strcmp` produza o mesmo resultado que `strcoll`
(função)

##### Exame de strings

[ strlen](<#/doc/string/byte/strlen>) | retorna o comprimento de uma dada string
(função)
[ strcmp](<#/doc/string/byte/strcmp>) | compara duas strings
(função)
[ strncmp](<#/doc/string/byte/strncmp>) | compara um certo número de caracteres de duas strings
(função)
[ strcoll](<#/doc/string/byte/strcoll>) | compara duas strings de acordo com o locale atual
(função)
[ strchr](<#/doc/string/byte/strchr>) | encontra a primeira ocorrência de um caractere
(função)
[ strrchr](<#/doc/string/byte/strrchr>) | encontra a última ocorrência de um caractere
(função)
[ strspn](<#/doc/string/byte/strspn>) | retorna o comprimento do segmento inicial máximo que consiste
apenas nos caracteres encontrados em outra string de bytes
(função)
[ strcspn](<#/doc/string/byte/strcspn>) | retorna o comprimento do segmento inicial máximo que consiste
apenas nos caracteres não encontrados em outra string de bytes
(função)
[ strpbrk](<#/doc/string/byte/strpbrk>) | encontra a primeira localização de qualquer caractere de um conjunto de separadores
(função)
[ strstr](<#/doc/string/byte/strstr>) | encontra a primeira ocorrência de uma substring de caracteres
(função)
[ strtok](<#/doc/string/byte/strtok>) | encontra o próximo token em uma string de bytes
(função)

##### Manipulação de array de caracteres

[ memchr](<#/doc/string/byte/memchr>) | procura em um array pela primeira ocorrência de um caractere
(função)
[ memcmp](<#/doc/string/byte/memcmp>) | compara dois buffers
(função)
[ memset](<#/doc/string/byte/memset>) | preenche um buffer com um caractere
(função)
[ memcpy](<#/doc/string/byte/memcpy>) | copia um buffer para outro
(função)
[ memmove](<#/doc/string/byte/memmove>) | move um buffer para outro
(função)

##### Diversos

[ strerror](<#/doc/string/byte/strerror>) | retorna uma versão textual de um dado código de erro
(função)

### Notas

* [NULL](<#/doc/types/NULL>) também é definido nos seguintes headers:
  * [`<clocale>`](<#/doc/header/clocale>)
  * [`<ctime>`](<#/doc/header/ctime>)
  * [`<cstddef>`](<#/doc/header/cstddef>)
  * [`<cstdio>`](<#/doc/header/cstdio>)
  * [`<cwchar>`](<#/doc/header/cwchar>)
* [std::size_t](<#/doc/types/size_t>) também é definido nos seguintes headers:
  * [`<ctime>`](<#/doc/header/ctime>)
  * [`<cstddef>`](<#/doc/header/cstddef>)
  * [`<cstdio>`](<#/doc/header/cstdio>)
  * [`<cuchar>`](<#/doc/header/cuchar>) (desde C++17)
  * [`<cwchar>`](<#/doc/header/cwchar>)

### Sinopse
```cpp
    namespace std {
      using size_t = /* see description */;                  // freestanding
     
      void* memcpy(void* s1, const void* s2, size_t n);      // freestanding
      void* memmove(void* s1, const void* s2, size_t n);     // freestanding
      char* strcpy(char* s1, const char* s2);                // freestanding
      char* strncpy(char* s1, const char* s2, size_t n);     // freestanding
      char* strcat(char* s1, const char* s2);                // freestanding
      char* strncat(char* s1, const char* s2, size_t n);     // freestanding
      int memcmp(const void* s1, const void* s2, size_t n);  // freestanding
      int strcmp(const char* s1, const char* s2);            // freestanding
      int strcoll(const char* s1, const char* s2);
      int strncmp(const char* s1, const char* s2, size_t n); // freestanding
      size_t strxfrm(char* s1, const char* s2, size_t n);
      const void* memchr(const void* s, int c, size_t n);    // freestanding
      void* memchr(void* s, int c, size_t n);                // freestanding
      const char* strchr(const char* s, int c);              // freestanding
      char* strchr(char* s, int c);                          // freestanding
      size_t strcspn(const char* s1, const char* s2);        // freestanding
      const char* strpbrk(const char* s1, const char* s2);   // freestanding
      char* strpbrk(char* s1, const char* s2);               // freestanding
      const char* strrchr(const char* s, int c);             // freestanding
      char* strrchr(char* s, int c);                         // freestanding
      size_t strspn(const char* s1, const char* s2);         // freestanding
      const char* strstr(const char* s1, const char* s2);    // freestanding
      char* strstr(char* s1, const char* s2);                // freestanding
      char* strtok(char* s1, const char* s2);                // freestanding
      void* memset(void* s, int c, size_t n);                // freestanding
      char* strerror(int errnum);
      size_t strlen(const char* s);                          // freestanding
    }
     
    #define NULL /* see description */                       // freestanding
```