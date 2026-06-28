# Header da biblioteca padrão &lt;cstdio&gt;

Este header estava originalmente na biblioteca padrão C como [`<stdio.h>`](<#/>).

Este header faz parte da biblioteca de [entrada/saída estilo C](<#/doc/io/c>).

### Tipos

---
[ FILE](<#/doc/io/c/FILE>) | tipo de objeto, capaz de armazenar todas as informações necessárias para controlar um stream de E/S C
(typedef)
[ fpos_t](<#/doc/io/c/fpos_t>) | tipo de objeto completo não-array, capaz de especificar unicamente uma posição em um arquivo, incluindo seu estado de análise multibyte
(typedef)
[ size_t](<#/doc/types/size_t>) | tipo inteiro sem sinal retornado pelo operador [`sizeof`](<#/doc/language/sizeof>)
(typedef)

### Macros

[ NULL](<#/doc/types/NULL>) | constante de ponteiro nulo definida pela implementação
(macro constante)
[ stdinstdoutstderr](<#/doc/io/c/std_streams>) | expressão do tipo FILE* associada ao stream de entrada
expressão do tipo FILE* associada ao stream de saída
expressão do tipo FILE* associada ao stream de saída de erro
(macro constante)
EOF | expressão constante inteira do tipo int e valor negativo
(macro constante)
FOPEN_MAX | número máximo de arquivos que podem ser abertos simultaneamente
(macro constante)
FILENAME_MAX | tamanho necessário para um array de char para armazenar o nome de arquivo mais longo suportado
(macro constante)
BUFSIZ | tamanho do buffer usado por [std::setbuf](<#/doc/io/c/setbuf>)
(macro constante)
_IOFBF_IOLBF_IONBF | argumento para [std::setbuf](<#/doc/io/c/setbuf>) indicando E/S totalmente armazenada em buffer
argumento para [std::setbuf](<#/doc/io/c/setbuf>) indicando E/S armazenada em buffer por linha
argumento para [std::setbuf](<#/doc/io/c/setbuf>) indicando E/S não armazenada em buffer
(macro constante)
SEEK_SETSEEK_CURSEEK_END | argumento para [std::fseek](<#/doc/io/c/fseek>) indicando busca a partir do início do arquivo
argumento para [std::fseek](<#/doc/io/c/fseek>) indicando busca a partir da posição atual do arquivo
argumento para [std::fseek](<#/doc/io/c/fseek>) indicando busca a partir do final do arquivo
(macro constante)
TMP_MAX | número máximo de nomes de arquivo únicos que podem ser gerados por [std::tmpnam](<#/doc/io/c/tmpnam>)
(macro constante)
L_tmpnam | tamanho necessário para um array de char para armazenar o resultado de [std::tmpnam](<#/doc/io/c/tmpnam>)
(macro constante)

### Funções

##### Acesso a arquivos

[ fopen](<#/doc/io/c/fopen>) | abre um arquivo
(função)
[ freopen](<#/doc/io/c/freopen>) | abre um stream existente com um nome diferente
(função)
[ fclose](<#/doc/io/c/fclose>) | fecha um arquivo
(função)
[ fflush](<#/doc/io/c/fflush>) | sincroniza um stream de saída com o arquivo real
(função)
[ setbuf](<#/doc/io/c/setbuf>) | define o buffer para um stream de arquivo
(função)
[ setvbuf](<#/doc/io/c/setvbuf>) | define o buffer e seu tamanho para um stream de arquivo
(função)

##### Entrada/saída direta

[ fread](<#/doc/io/c/fread>) | lê de um arquivo
(função)
[ fwrite](<#/doc/io/c/fwrite>) | escreve em um arquivo
(função)

##### Entrada/saída não formatada

##### Caractere estreito

[ fgetcgetc](<#/doc/io/c/fgetc>) | obtém um caractere de um stream de arquivo
(função)
[ fgets](<#/doc/io/c/fgets>) | obtém uma string de caracteres de um stream de arquivo
(função)
[ fputcputc](<#/doc/io/c/fputc>) | escreve um caractere em um stream de arquivo
(função)
[ fputs](<#/doc/io/c/fputs>) | escreve uma string de caracteres em um stream de arquivo
(função)
[ getchar](<#/doc/io/c/getchar>) | lê um caractere de [stdin](<#/doc/io/c/std_streams>)
(função)
[ gets](<#/doc/io/c/gets>)(obsoleto desde C++11)(removido em C++14) | lê uma string de caracteres de [stdin](<#/doc/io/c/std_streams>)
(função)
[ putchar](<#/doc/io/c/putchar>) | escreve um caractere em [stdout](<#/doc/io/c/std_streams>)
(função)
[ puts](<#/doc/io/c/puts>) | escreve uma string de caracteres em [stdout](<#/doc/io/c/std_streams>)
(função)
[ ungetc](<#/doc/io/c/ungetc>) | coloca um caractere de volta em um stream de arquivo
(função)

##### Entrada/saída formatada

##### Caractere estreito/multibyte

[ scanffscanfsscanf](<#/doc/io/c/scanf>) | lê entrada formatada de [stdin](<#/doc/io/c/std_streams>), um stream de arquivo ou um buffer
(função)
[ vscanfvfscanfvsscanf](<#/doc/io/c/vfscanf>)(C++11)(C++11)(C++11) | lê entrada formatada de [stdin](<#/doc/io/c/std_streams>), um stream de arquivo ou um buffer
usando lista de argumentos variáveis
(função)
[ printffprintfsprintfsnprintf](<#/doc/io/c/printf>)(C++11) | imprime saída formatada para [stdout](<#/doc/io/c/std_streams>), um stream de arquivo ou um buffer
(função)
[ vprintfvfprintfvsprintfvsnprintf](<#/doc/io/c/vfprintf>)(C++11) | imprime saída formatada para [stdout](<#/doc/io/c/std_streams>), um stream de arquivo ou um buffer
usando lista de argumentos variáveis
(função)

##### Posicionamento de arquivo

[ ftell](<#/doc/io/c/ftell>) | retorna o indicador de posição atual do arquivo
(função)
[ fgetpos](<#/doc/io/c/fgetpos>) | obtém o indicador de posição do arquivo
(função)
[ fseek](<#/doc/io/c/fseek>) | move o indicador de posição do arquivo para um local específico em um arquivo
(função)
[ fsetpos](<#/doc/io/c/fsetpos>) | move o indicador de posição do arquivo para um local específico em um arquivo
(função)
[ rewind](<#/doc/io/c/rewind>) | move o indicador de posição do arquivo para o início em um arquivo
(função)

##### Tratamento de erros

[ clearerr](<#/doc/io/c/clearerr>) | limpa erros
(função)
[ feof](<#/doc/io/c/feof>) | verifica o fim do arquivo
(função)
[ ferror](<#/doc/io/c/ferror>) | verifica um erro de arquivo
(função)
[ perror](<#/doc/io/c/perror>) | exibe uma string de caracteres correspondente ao erro atual em [stderr](<#/doc/io/c/std_streams>)
(função)

##### Operações em arquivos

[ remove](<#/doc/io/c/remove>) | apaga um arquivo
(função)
[ rename](<#/doc/io/c/rename>) | renomeia um arquivo
(função)
[ tmpfile](<#/doc/io/c/tmpfile>) | cria e abre um arquivo temporário, com remoção automática
(função)
[ tmpnam](<#/doc/io/c/tmpnam>) | retorna um nome de arquivo único
(função)

### Sinopse
```cpp
    namespace std {
      using size_t = /* see description */;
      using FILE = /* see description */;
      using fpos_t = /* see description */;
    }
    
    #define NULL /* see description */
    #define _IOFBF /* see description */
    #define _IOLBF /* see description */
    #define _IONBF /* see description */
    #define BUFSIZ /* see description */
    #define EOF /* see description */
    #define FOPEN_MAX /* see description */
    #define FILENAME_MAX /* see description */
    #define L_tmpnam /* see description */
    #define SEEK_CUR /* see description */
    #define SEEK_END /* see description */
    #define SEEK_SET /* see description */
    #define TMP_MAX /* see description */
    #define stderr /* see description */
    #define stdin /* see description */
    #define stdout /* see description */
    
    namespace std {
      int remove(const char* filename);
      int rename(const char* old_p, const char* new_p);
      FILE* tmpfile();
      char* tmpnam(char* s);
      int fclose(FILE* stream);
      int fflush(FILE* stream);
      FILE* fopen(const char* filename, const char* mode);
      FILE* freopen(const char* filename, const char* mode, FILE* stream);
      void setbuf(FILE* stream, char* buf);
      int setvbuf(FILE* stream, char* buf, int mode, size_t size);
      int fprintf(FILE* stream, const char* format, ...);
      int fscanf(FILE* stream, const char* format, ...);
      int printf(const char* format, ...);
      int scanf(const char* format, ...);
      int snprintf(char* s, size_t n, const char* format, ...);
      int sprintf(char* s, const char* format, ...);
      int sscanf(const char* s, const char* format, ...);
      int vfprintf(FILE* stream, const char* format, va_list arg);
      int vfscanf(FILE* stream, const char* format, va_list arg);
      int vprintf(const char* format, va_list arg);
      int vscanf(const char* format, va_list arg);
      int vsnprintf(char* s, size_t n, const char* format, va_list arg);
      int vsprintf(char* s, const char* format, va_list arg);
      int vsscanf(const char* s, const char* format, va_list arg);
      int fgetc(FILE* stream);
      char* fgets(char* s, int n, FILE* stream);
      int fputc(int c, FILE* stream);
      int fputs(const char* s, FILE* stream);
      int getc(FILE* stream);
      int getchar();
      int putc(int c, FILE* stream);
      int putchar(int c);
      int puts(const char* s);
      int ungetc(int c, FILE* stream);
      size_t fread(void* ptr, size_t size, size_t nmemb, FILE* stream);
      size_t fwrite(const void* ptr, size_t size, size_t nmemb, FILE* stream);
      int fgetpos(FILE* stream, fpos_t* pos);
      int fseek(FILE* stream, long int offset, int whence);
      int fsetpos(FILE* stream, const fpos_t* pos);
      long int ftell(FILE* stream);
      void rewind(FILE* stream);
      void clearerr(FILE* stream);
      int feof(FILE* stream);
      int ferror(FILE* stream);
      void perror(const char* s);
    }
```

### Notas

  * [NULL](<#/doc/types/NULL>) também é definido nos seguintes headers:
    * [`<clocale>`](<#/doc/header/clocale>)
    * [`<ctime>`](<#/doc/header/ctime>)
    * [`<cstddef>`](<#/doc/header/cstddef>)
    * [`<cstring>`](<#/doc/header/cstring>)
    * [`<cwchar>`](<#/doc/header/cwchar>)
    * [`<cstdlib>`](<#/doc/header/cstdlib>)
  * [std::size_t](<#/doc/types/size_t>) também é definido nos seguintes headers:
    * [`<ctime>`](<#/doc/header/ctime>)
    * [`<cstddef>`](<#/doc/header/cstddef>)
    * [`<cstring>`](<#/doc/header/cstring>)
    * [`<cwchar>`](<#/doc/header/cwchar>)
    * [`<cuchar>`](<#/doc/header/cuchar>) (desde C++17)
    * [`<cstdlib>`](<#/doc/header/cstdlib>)
