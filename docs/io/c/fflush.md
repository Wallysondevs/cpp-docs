# std::fflush

Definido no header `[<cstdio>](<#/doc/header/cstdio>)`

```cpp
int fflush( std::FILE* stream );
```

Para streams de saída (e para streams de atualização nos quais a última operação foi de saída), escreve quaisquer dados não escritos do buffer do `stream` para o dispositivo de saída associado.

Para streams de entrada (e para streams de atualização nos quais a última operação foi de entrada), o comportamento é indefinido.

Se `stream` for um ponteiro nulo, todos os streams de saída abertos são descarregados (flushed), incluindo aqueles manipulados dentro de pacotes de biblioteca ou que não são diretamente acessíveis ao programa.

### Parâmetros

- **stream** — o stream de arquivo para escrita

### Valor de retorno

Retorna zero em caso de sucesso. Caso contrário, [EOF](<#/doc/io/c>) é retornado e o indicador de erro do stream de arquivo é definido.

### Notas

POSIX [estende a especificação de `fflush`](<https://pubs.opengroup.org/onlinepubs/9699919799/functions/fflush.html>) definindo seus efeitos em um stream de entrada, desde que esse stream represente um arquivo ou outro dispositivo pesquisável (seekable): nesse caso, o ponteiro de arquivo POSIX é reposicionado para corresponder ao ponteiro de stream C (o que efetivamente desfaz qualquer buffer de leitura) e os efeitos de qualquer [std::ungetc](<#/doc/io/c/ungetc>) ou [std::ungetwc](<#/doc/io/c/ungetwc>) que ainda não foram lidos de volta do stream são descartados.

A Microsoft também estende a especificação de `fflush` definindo seus efeitos em um stream de entrada: no Visual Studio 2013 e anteriores, ele [descartava o buffer de entrada](<https://learn.microsoft.com/en-us/previous-versions/visualstudio/visual-studio-2013/9yky46tz\(v=vs.120\)>), no Visual Studio 2015 e posteriores, ele [não tem efeito, os buffers são retidos](<https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fflush?view=msvc-140>).

### Veja também

[ fopen](<#/doc/io/c/fopen>) | abre um arquivo
(função)
[ fclose](<#/doc/io/c/fclose>) | fecha um arquivo
(função)
[documentação C](<#/>) para fflush