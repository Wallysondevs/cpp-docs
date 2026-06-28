# std::fgetpos

Definido no header `[<cstdio>](<#/doc/header/cstdio>)`

```cpp
int fgetpos( std::FILE* stream, std::fpos_t* pos );
```

  
Obtém o indicador de posição do arquivo e o estado de análise atual (se houver) para o stream de arquivo `stream` e os armazena no objeto apontado por `pos`. O valor armazenado é significativo apenas como entrada para [std::fsetpos](<#/doc/io/c/fsetpos>). 

### Parâmetros

stream  |  \-  |  stream de arquivo a ser examinado   
---|---|---
pos  |  \-  |  ponteiro para um objeto fpos_t para armazenar o indicador de posição do arquivo   
  
### Valor de retorno

​0​ em caso de sucesso, valor diferente de zero caso contrário. Também define [errno](<#/doc/error/errno>) em caso de falha. 

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ ftell](<#/doc/io/c/ftell>) |  retorna o indicador de posição atual do arquivo   
(função)  
[ fseek](<#/doc/io/c/fseek>) |  move o indicador de posição do arquivo para um local específico em um arquivo   
(função)  
[ fsetpos](<#/doc/io/c/fsetpos>) |  move o indicador de posição do arquivo para um local específico em um arquivo   
(função)  
[Documentação C](<#/>) para fgetpos