# Cabeçalho da biblioteca padrão &lt;cstdlib&gt;

Este cabeçalho estava originalmente na biblioteca padrão C como [`<stdlib.h>`](<#/>).

Este cabeçalho fornece utilitários diversos. Os símbolos definidos aqui são usados por vários componentes da biblioteca.

### Tipos

---
[ div_t](<#/doc/numeric/math/div>) | tipo de estrutura, retornado por [std::div](<#/doc/numeric/math/div>)
(typedef)
[ ldiv_t](<#/doc/numeric/math/div>) | tipo de estrutura, retornado por [std::ldiv](<#/doc/numeric/math/div>)
(typedef)
[ lldiv_t](<#/doc/numeric/math/div>)(desde C++11) | tipo de estrutura, retornado por [std::lldiv](<#/doc/numeric/math/div>)
(typedef)
[ size_t](<#/doc/types/size_t>) | tipo inteiro sem sinal retornado pelo operador [`sizeof`](<#/doc/language/sizeof>)
(typedef)

### Constantes de macro

[ EXIT_SUCCESSEXIT_FAILURE](<#/doc/utility/program/EXIT_status>) | indica o status de execução do programa
(macro constant)
MB_CUR_MAX | número máximo de bytes em um caractere multibyte com a localidade atual
(macro constant)
[ NULL](<#/doc/types/NULL>) | constante de ponteiro nulo definida pela implementação
(macro constant)
[ RAND_MAX](<#/doc/numeric/random/RAND_MAX>) | valor máximo possível gerado por [std::rand](<#/doc/numeric/random/rand>)
(macro constant)

### Funções

##### Controle de processo

[ abort](<#/doc/utility/program/abort>) | causa a terminação anormal do programa (sem limpeza)
(function)
[ exit](<#/doc/utility/program/exit>) | causa a terminação normal do programa com limpeza
(function)
[ quick_exit](<#/doc/utility/program/quick_exit>)(desde C++11) | causa a terminação rápida do programa sem limpeza completa
(function)
[ _Exit](<#/doc/utility/program/_Exit>)(desde C++11) | causa a terminação normal do programa sem limpeza
(function)
[ atexit](<#/doc/utility/program/atexit>) | registra uma função a ser chamada na invocação de [std::exit()](<#/doc/utility/program/exit>)
(function)
[ at_quick_exit](<#/doc/utility/program/at_quick_exit>)(desde C++11) | registra uma função a ser chamada na invocação de [std::quick_exit](<#/doc/utility/program/quick_exit>)
(function)
[ system](<#/doc/utility/program/system>) | chama o processador de comandos do ambiente hospedeiro
(function)
[ getenv](<#/doc/utility/program/getenv>) | acesso à lista de variáveis de ambiente
(function)

##### Gerenciamento de memória

[ malloc](<#/doc/memory/c/malloc>) | aloca memória
(function)
[ aligned_alloc](<#/doc/memory/c/aligned_alloc>)(desde C++17) | aloca memória alinhada
(function)
[ calloc](<#/doc/memory/c/calloc>) | aloca e zera memória
(function)
[ realloc](<#/doc/memory/c/realloc>) | expande ou encolhe um bloco de memória previamente alocado
(function)
[ free](<#/doc/memory/c/free>) | desaloca memória previamente alocada
(function)

##### Conversão de string numérica

[ atof](<#/doc/string/byte/atof>) | converte uma string de bytes para um valor de ponto flutuante
(function)
[ atoiatolatoll](<#/doc/string/byte/atoi>)(desde C++11) | converte uma string de bytes para um valor inteiro
(function)
[ strtolstrtoll](<#/doc/string/byte/strtol>)(desde C++11) | converte uma string de bytes para um valor inteiro
(function)
[ strtoulstrtoull](<#/doc/string/byte/strtoul>)(desde C++11) | converte uma string de bytes para um valor inteiro sem sinal
(function)
[ strtofstrtodstrtold](<#/doc/string/byte/strtof>) | converte uma string de bytes para um valor de ponto flutuante
(function)

##### Manipulação de wide string

[ mblen](<#/doc/string/multibyte/mblen>) | retorna o número de bytes no próximo caractere multibyte
(function)
[ mbtowc](<#/doc/string/multibyte/mbtowc>) | converte o próximo caractere multibyte para wide character
(function)
[ wctomb](<#/doc/string/multibyte/wctomb>) | converte um wide character para sua representação multibyte
(function)
[ mbstowcs](<#/doc/string/multibyte/mbstowcs>) | converte uma string de caracteres multibyte estreita para wide string
(function)
[ wcstombs](<#/doc/string/multibyte/wcstombs>) | converte uma wide string para string de caracteres multibyte estreita
(function)

##### Algoritmos e matemática diversos

[ rand](<#/doc/numeric/random/rand>) | gera um número pseudoaleatório
(function)
[ srand](<#/doc/numeric/random/srand>) | inicializa o gerador de números pseudoaleatórios
(function)
[ qsort](<#/doc/algorithm/qsort>) | ordena um range de elementos com tipo não especificado
(function)
[ bsearch](<#/doc/algorithm/bsearch>) | busca em um array por um elemento de tipo não especificado
(function)
[ abs(int)labsllabs](<#/doc/numeric/math/abs>)(desde C++11) | calcula o valor absoluto de um valor integral (\\(\small{|x|}\\)|x|)
(function)
[ div(int)ldivlldiv](<#/doc/numeric/math/div>)(desde C++11) | calcula o quociente e o resto da divisão inteira
(function)

### Sinopse
```cpp
    namespace std {
      using size_t =  /* see description */; // freestanding
      using div_t =   /* see description */; // freestanding
      using ldiv_t =  /* see description */; // freestanding
      using lldiv_t = /* see description */; // freestanding
    }
    
    #define NULL         /* see description */ // freestanding
    #define EXIT_FAILURE /* see description */ // freestanding
    #define EXIT_SUCCESS /* see description */ // freestanding
    #define RAND_MAX     /* see description */
    #define MB_CUR_MAX   /* see description */
    
    namespace std {
      // Exposition-only function type aliases
      extern "C" using /* c-atexit-handler */ = void(); // exposition only
      extern "C++" using /* atexit-handler */ = void(); // exposition only
      extern "C" using /* c-compare-pred */ =           // exposition only
        int(const void*, const void*);
      extern "C++" using /* compare-pred */ =           // exposition only
        int(const void*, const void*);
    
      // start and termination
      [[noreturn]] void abort() noexcept;                       // freestanding
      int atexit(/* c-atexit-handler */* func) noexcept;        // freestanding
      int atexit(/* atexit-handler */* func) noexcept;          // freestanding
      int at_quick_exit(/* c-atexit-handler */* func) noexcept; // freestanding
      int at_quick_exit(/* atexit-handler */* func) noexcept;   // freestanding
      [[noreturn]] void exit(int status);                       // freestanding
      [[noreturn]] void _Exit(int status) noexcept;             // freestanding
      [[noreturn]] void quick_exit(int status) noexcept;        // freestanding
    
      char* getenv(const char* name);
      int system(const char* string);
    
      // C library memory allocation
      void* aligned_alloc(size_t alignment, size_t size);
      void* calloc(size_t nmemb, size_t size);
      void free(void* ptr);
      void* malloc(size_t size);
      void* realloc(void* ptr, size_t size);
    
      double atof(const char* nptr);
      int atoi(const char* nptr);
      long int atol(const char* nptr);
      long long int atoll(const char* nptr);
      double strtod(const char* nptr, char** endptr);
      float strtof(const char* nptr, char** endptr);
      long double strtold(const char* nptr, char** endptr);
      long int strtol(const char* nptr, char** endptr, int base);
      long long int strtoll(const char* nptr, char** endptr, int base);
      unsigned long int strtoul(const char* nptr, char** endptr, int base);
      unsigned long long int strtoull(const char* nptr, char** endptr, int base);
    
      // multibyte / wide string and character conversion functions
      int mblen(const char* s, size_t n);
      int mbtowc(wchar_t* pwc, const char* s, size_t n);
      int wctomb(char* s, wchar_t wchar);
      size_t mbstowcs(wchar_t* pwcs, const char* s, size_t n);
      size_t wcstombs(char* s, const wchar_t* pwcs, size_t n);
    
      // C standard library algorithms
      void* bsearch(const void* key, const void* base,  // freestanding
                    size_t nmemb, size_t size, /* c-compare-pred */* compar);
      void* bsearch(const void* key, const void* base,  // freestanding
                    size_t nmemb, size_t size, /* compare-pred */* compar);
      void qsort(void* base, size_t nmemb, size_t size, // freestanding
                 /* c-compare-pred */* compar);
      void qsort(void* base, size_t nmemb, size_t size, // freestanding
                 /* compare-pred */* compar);
    
      // low-quality random number generation
      int rand();
      void srand(unsigned int seed);
    
      // absolute values
      constexpr int abs(int j);                       // freestanding
      constexpr long int abs(long int j);             // freestanding
      constexpr long long int abs(long long int j);   // freestanding
      constexpr /* floating-point-type */
        abs(/* floating-point-type */ j);             // freestanding-deleted
    
      constexpr long int labs(long int j);            // freestanding
      constexpr long long int llabs(long long int j); // freestanding
    
      constexpr div_t div(int numer, int denom);                         // freestanding
      constexpr ldiv_t div(long int numer, long int denom);              // freestanding
      constexpr lldiv_t div(long long int numer, long long int denom);   // freestanding
      constexpr ldiv_t ldiv(long int numer, long int denom);             // freestanding
      constexpr lldiv_t lldiv(long long int numer, long long int denom); // freestanding
    }
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 286](<https://cplusplus.github.io/LWG/issue286>) | C++98 | a definição de `size_t` não era fornecida em `<cstdlib>` | fornecida

### Veja também

* [Utilitários de suporte a programas](<#/doc/utility/program>)
* [Geração de números pseudoaleatórios](<#/doc/numeric/random>)
* [Funções matemáticas comuns](<#/doc/numeric/math>)
* [Funções matemáticas especiais](<#/doc/numeric/special_functions>)
* [Biblioteca de gerenciamento de memória C](<#/doc/memory/c>)
* [Strings de bytes terminadas em nulo](<#/doc/string/byte>)
* [Strings multibyte terminadas em nulo](<#/doc/string/multibyte>)
* [Biblioteca de algoritmos](<#/doc/algorithm>)
