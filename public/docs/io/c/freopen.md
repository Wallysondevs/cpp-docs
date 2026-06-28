# std::freopen

Definido no header `[<cstdio>](<#/doc/header/cstdio>)`

```cpp
std::FILE* freopen( const char* filename, const char* mode, std::FILE* stream );
```

  
Primeiro, tenta fechar o arquivo associado a stream, ignorando quaisquer erros. Em seguida, se filename não for nulo, tenta abrir o arquivo especificado por filename usando mode como se fosse por [std::fopen](<#/doc/io/c/fopen>), e associa esse arquivo à stream de arquivo apontada por stream. Se filename for um ponteiro nulo, então a função tenta reabrir o arquivo que já está associado a stream (é definido pela implementação quais mudanças de modo são permitidas neste caso). 

### Parâmetros

filename  |  \-  |  nome do arquivo para associar à stream de arquivo   
---|---|---
mode  |  \-  |  string de caracteres terminada em nulo que determina o novo [modo de acesso ao arquivo](<#/doc/io/c/freopen>)  
stream  |  \-  |  a stream de arquivo a ser modificada   
  
### Flags de acesso ao arquivo

String do modo de acesso ao arquivo  |  Significado  |  Explicação  |  Ação se o arquivo   
já existe  |  Ação se o arquivo   
não existe   
"r" |  leitura  |  Abre um arquivo para leitura  |  lê do início  |  retorna [NULL](<#/doc/types/NULL>) e define erro   
---|---|---|---|---
"w" |  escrita  |  Cria um arquivo para escrita  |  destrói o conteúdo  |  cria novo   
"a" |  anexar  |  Anexa a um arquivo  |  escreve no final  |  cria novo   
"r+" |  leitura estendida  |  Abre um arquivo para leitura/escrita  |  lê do início  |  retorna [NULL](<#/doc/types/NULL>) e define erro   
"w+" |  escrita estendida  |  Cria um arquivo para leitura/escrita  |  destrói o conteúdo  |  cria novo   
"a+" |  anexar estendido  |  Abre um arquivo para leitura/escrita  |  escreve no final  |  cria novo   
A flag de modo de acesso ao arquivo "b" pode ser opcionalmente especificada para abrir um arquivo [em modo binário](<#/doc/io/c/FILE>). Esta flag não tem efeito em sistemas POSIX, mas no Windows, por exemplo, ela desabilita o tratamento especial de '\n' e '\x1A'.   
Nos modos de acesso ao arquivo de anexação, os dados são escritos no final do arquivo, independentemente da posição atual do indicador de posição do arquivo.   
A flag de modo de acesso ao arquivo "x" pode ser opcionalmente anexada aos especificadores "w" ou "w+". Esta flag força a função a falhar se o arquivo existir, em vez de sobrescrevê-lo. (C++17)  
O comportamento é indefinido se o modo não for uma das strings listadas acima. Algumas implementações definem modos adicionais suportados (por exemplo, [Windows](<https://docs.microsoft.com/en-us/cpp/c-runtime-library/reference/fopen-wfopen>)).   
  
### Valor de retorno

stream em caso de sucesso, um ponteiro nulo em caso de falha. 

### Notas

**std::freopen** é a única maneira de mudar a orientação narrow/wide de uma stream uma vez que ela tenha sido estabelecida por uma operação de E/S ou por std::fwide. 

A versão Microsoft CRT de **std::freopen** não suporta nenhuma mudança de modo quando filename é um ponteiro nulo e trata isso como um erro (veja a [documentação](<https://docs.microsoft.com/en-us/cpp/c-runtime-library/reference/freopen-wfreopen>)). Uma possível solução alternativa é a função não-padrão [`_setmode()`](<https://docs.microsoft.com/en-us/cpp/c-runtime-library/reference/setmode>). 

### Exemplo

O código a seguir redireciona `stdout` para um arquivo.

Execute este código
```
    #include <cstdio>
     
    int main()
    {
        std::printf("stdout is printed to console\n");
        if (std::freopen("redir.txt", "w", stdout))
        {
            std::printf("stdout is redirected to a file\n"); // this is written to redir.txt
            std::fclose(stdout);
        }
    }
```

Saída: 
```
    stdout is printed to console
```

### Veja também

[ fopen](<#/doc/io/c/fopen>) |  abre um arquivo   
(função)  
[ fclose](<#/doc/io/c/fclose>) |  fecha um arquivo   
(função)  
[documentação C](<#/>) para freopen