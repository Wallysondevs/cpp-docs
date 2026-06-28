# Entrada/saída de arquivo estilo C

O subconjunto de E/S C da biblioteca padrão C++ implementa operações de entrada/saída de stream estilo C. O header [`<cstdio>`](<#/doc/header/cstdio>) fornece suporte genérico a operações de arquivo e oferece funções com capacidades de entrada/saída de caracteres estreitos e multibyte, e o header [`<cwchar>`](<#/doc/header/cwchar>) fornece funções com capacidades de entrada/saída de caracteres largos.

Streams C são denotados por objetos do tipo [std::FILE](<#/doc/io/c/FILE>) que só podem ser acessados e manipulados através de ponteiros do tipo [std::FILE](<#/doc/io/c/FILE>)*. Cada stream C está associado a um dispositivo físico externo (arquivo, stream de entrada padrão, impressora, porta serial, etc).

### Tipos

Definidos no header `[<cstdio>](<#/doc/header/cstdio>)`
---
[ FILE](<#/doc/io/c/FILE>) | tipo de objeto, capaz de armazenar todas as informações necessárias para controlar um stream de E/S C
(typedef)
[ fpos_t](<#/doc/io/c/fpos_t>) | tipo de objeto completo não-array, capaz de especificar unicamente uma posição em um arquivo, incluindo seu estado de análise multibyte
(typedef)

### Streams padrão predefinidos

Definidos no header `[<cstdio>](<#/doc/header/cstdio>)`
---
[ stdinstdoutstderr](<#/doc/io/c/std_streams>) | expressão do tipo FILE* associada ao stream de entrada
expressão do tipo FILE* associada ao stream de saída
expressão do tipo FILE* associada ao stream de saída de erro
(macro constante)

### Funções

Definidas no header `[<cstdio>](<#/doc/header/cstdio>)`
---

##### Acesso a arquivo

[ fopen](<#/doc/io/c/fopen>) | abre um arquivo
(função)
[ freopen](<#/doc/io/c/freopen>) | abre um stream existente com um nome diferente
(função)
[ fclose](<#/doc/io/c/fclose>) | fecha um arquivo
(função)
[ fflush](<#/doc/io/c/fflush>) | sincroniza um stream de saída com o arquivo real
(função)
[ fwide](<#/doc/io/c/fwide>) | alterna um stream de arquivo entre E/S de caracteres largos e E/S de caracteres estreitos
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

###### Caractere byte/multibyte

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
[ gets](<#/doc/io/c/gets>)(obsoleto desde C++11)(removido desde C++14) | lê uma string de caracteres de [stdin](<#/doc/io/c/std_streams>)
(função)
[ putchar](<#/doc/io/c/putchar>) | escreve um caractere em [stdout](<#/doc/io/c/std_streams>)
(função)
[ puts](<#/doc/io/c/puts>) | escreve uma string de caracteres em [stdout](<#/doc/io/c/std_streams>)
(função)
[ ungetc](<#/doc/io/c/ungetc>) | coloca um caractere de volta em um stream de arquivo
(função)

###### Caractere largo

[ fgetwcgetwc](<#/doc/io/c/fgetwc>) | obtém um caractere largo de um stream de arquivo
(função)
[ fgetws](<#/doc/io/c/fgetws>) | obtém uma string larga de um stream de arquivo
(função)
[ fputwcputwc](<#/doc/io/c/fputwc>) | escreve um caractere largo em um stream de arquivo
(função)
[ fputws](<#/doc/io/c/fputws>) | escreve uma string larga em um stream de arquivo
(função)
[ getwchar](<#/doc/io/c/getwchar>) | lê um caractere largo de [stdin](<#/doc/io/c/std_streams>)
(função)
[ putwchar](<#/doc/io/c/putwchar>) | escreve um caractere largo em [stdout](<#/doc/io/c/std_streams>)
(função)
[ ungetwc](<#/doc/io/c/ungetwc>) | coloca um caractere largo de volta em um stream de arquivo
(função)

##### Entrada/saída formatada

###### Caractere byte/multibyte

[ scanffscanfsscanf](<#/doc/io/c/scanf>) | lê entrada formatada de [stdin](<#/doc/io/c/std_streams>), um stream de arquivo ou um buffer
(função)
[ vscanfvfscanfvsscanf](<#/doc/io/c/vfscanf>)(desde C++11)(desde C++11)(desde C++11) | lê entrada formatada de [stdin](<#/doc/io/c/std_streams>), um stream de arquivo ou um buffer usando lista de argumentos variáveis
(função)
[ printffprintfsprintfsnprintf](<#/doc/io/c/printf>)(desde C++11) | imprime saída formatada para [stdout](<#/doc/io/c/std_streams>), um stream de arquivo ou um buffer
(função)
[ vprintfvfprintfvsprintfvsnprintf](<#/doc/io/c/vfprintf>)(desde C++11) | imprime saída formatada para [stdout](<#/doc/io/c/std_streams>), um stream de arquivo ou um buffer usando lista de argumentos variáveis
(função)

###### Caractere largo

[ wscanffwscanfswscanf](<#/doc/io/c/fwscanf>) | lê entrada formatada de caracteres largos de [stdin](<#/doc/io/c/std_streams>), um stream de arquivo ou um buffer
(função)
[ vwscanfvfwscanfvswscanf](<#/doc/io/c/vfwscanf>)(desde C++11)(desde C++11)(desde C++11) | lê entrada formatada de caracteres largos de [stdin](<#/doc/io/c/std_streams>), um stream de arquivo ou um buffer usando lista de argumentos variáveis
(função)
[ wprintffwprintfswprintf](<#/doc/io/c/fwprintf>) | imprime saída formatada de caracteres largos para [stdout](<#/doc/io/c/std_streams>), um stream de arquivo ou um buffer
(função)
[ vwprintfvfwprintfvswprintf](<#/doc/io/c/vfwprintf>) | imprime saída formatada de caracteres largos para [stdout](<#/doc/io/c/std_streams>), um stream de arquivo ou um buffer usando lista de argumentos variáveis
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

### Constantes de macro

Definidas no header `[<cstdio>](<#/doc/header/cstdio>)`
---
EOF | expressão constante inteira do tipo int e valor negativo
(macro constante)
FOPEN_MAX | número de arquivos que podem ser abertos simultaneamente
(macro constante)
FILENAME_MAX | tamanho necessário para um array de char para armazenar o nome de arquivo mais longo suportado
(macro constante)
BUFSIZ | tamanho do buffer usado por [std::setbuf](<#/doc/io/c/setbuf>)
(macro constante)
_IOFBF_IOLBF_IONBF | argumento para [std::setbuf](<#/doc/io/c/setbuf>) indicando E/S totalmente armazenada em buffer
argumento para [std::setbuf](<#/doc/io/c/setbuf>) indicando E/S armazenada em buffer por linha
argumento para [std::setbuf](<#/doc/io/c/setbuf>) indicando E/S não armazenada em buffer
(macro constante)
SEEK_SETSEEK_CURSEEK_END | argumento para [std::fseek](<#/doc/io/c/fseek>) indicando busca desde o início do arquivo
argumento para [std::fseek](<#/doc/io/c/fseek>) indicando busca desde a posição atual do arquivo
argumento para [std::fseek](<#/doc/io/c/fseek>) indicando busca desde o fim do arquivo
(macro constante)
TMP_MAX | número máximo de nomes de arquivo únicos que é garantido serem geráveis por [std::tmpnam](<#/doc/io/c/tmpnam>)
(macro constante)
L_tmpnam | tamanho necessário para um array de char para armazenar o resultado de [std::tmpnam](<#/doc/io/c/tmpnam>)
(macro constante)

### Veja também

[Documentação C](<#/>) para Entrada/saída de arquivo
---