# std::fseek

Definido no cabeçalho `[<cstdio>](<#/doc/header/cstdio>)`

```c
int fseek( std::FILE* stream, long offset, int origin );
```

Define o indicador de posição do arquivo para o stream de arquivo `stream`.

Se o stream estiver aberto em modo binário, a nova posição é exatamente `offset` bytes medidos a partir do início do arquivo se `origin` for [SEEK_SET](<#/doc/io/c>), a partir da posição atual do arquivo se `origin` for [SEEK_CUR](<#/doc/io/c>), e a partir do fim do arquivo se `origin` for [SEEK_END](<#/doc/io/c>). Streams binários não são obrigados a suportar [SEEK_END](<#/doc/io/c>), em particular se bytes nulos adicionais forem gravados.

Se o stream estiver aberto em modo texto, os únicos valores suportados para `offset` são zero (que funciona com qualquer `origin`) e um valor retornado por uma chamada anterior a [std::ftell](<#/doc/io/c/ftell>) em um stream associado ao mesmo arquivo (que funciona apenas com `origin` sendo [SEEK_SET](<#/doc/io/c>)).

Se o stream for orientado a caracteres largos, as restrições de streams de texto e binários se aplicam (o resultado de [std::ftell](<#/doc/io/c/ftell>) é permitido com [SEEK_SET](<#/doc/io/c>) e um `offset` zero é permitido a partir de [SEEK_SET](<#/doc/io/c>) e [SEEK_CUR](<#/doc/io/c>), mas não [SEEK_END](<#/doc/io/c>)).

Além de alterar o indicador de posição do arquivo, `fseek` desfaz os efeitos de [std::ungetc](<#/doc/io/c/ungetc>) e limpa o status de fim de arquivo, se aplicável.

Se ocorrer um erro de leitura ou escrita, o indicador de erro para o stream ([std::ferror](<#/doc/io/c/ferror>)) é definido e a posição do arquivo permanece inalterada.

### Parâmetros

- **stream** — stream de arquivo a ser modificado
- **offset** — número de caracteres para deslocar a posição em relação a `origin`
- **origin** — posição à qual `offset` é adicionado. Pode ter um dos seguintes valores: [SEEK_SET](<#/doc/io/c>), [SEEK_CUR](<#/doc/io/c>), [SEEK_END](<#/doc/io/c>)

### Valor de retorno

​0​ em caso de sucesso, valor diferente de zero caso contrário.

### Notas

Após buscar para uma posição que não seja o fim em um stream de caracteres largos, a próxima chamada a qualquer função de saída pode tornar o restante do arquivo indefinido, por exemplo, ao gravar uma sequência multibyte de um comprimento diferente.

POSIX permite buscar além do fim do arquivo existente. Se uma operação de saída for realizada após essa busca, qualquer leitura da lacuna retornará zero bytes. Onde suportado pelo sistema de arquivos, isso cria um _arquivo esparso_.

POSIX também exige que `fseek` primeiro execute [fflush](<#/doc/io/c/fflush>) se houver dados não gravados (mas se o estado de deslocamento é restaurado é definido pela implementação). Os streams de arquivo padrão C++ garantem tanto o `flushing` quanto a restauração do estado de deslocamento: [std::basic_filebuf::seekoff](<#/doc/io/basic_streambuf/pubseekoff>).

POSIX especifica que [`fseek`](<https://pubs.opengroup.org/onlinepubs/9699919799/functions/fseek.html>) deve retornar -1 em caso de erro e definir [errno](<#/doc/error/errno>) para indicar o erro.

No Windows, [`_fseeki64`](<https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/fseek-fseeki64>) pode ser usado para trabalhar com arquivos maiores que 2 GiB.

### Exemplo

Execute este código
```cpp
    #include <cassert>
    #include <cstdio>
    #include <cstdint>
    #include <fstream>
    #include <vector>
    
    int main()
    {
        std::ofstream("dummy.nfo") << "8 bytes\n"; // create the file
    
        std::FILE* fp = std::fopen("dummy.nfo", "rb");
        assert(fp);
    
        std::fseek(fp, 0, SEEK_END); // seek to end
        const std::size_t filesize = std::ftell(fp);
        std::vector<std::uint8_t> buffer(filesize);
    
        std::fseek(fp, 0, SEEK_SET); // seek to start
        std::fread(buffer.data(), sizeof(std::uint8_t), buffer.size(), fp);
    
        std::fclose(fp);
        std::printf("I've read %zi bytes\n", filesize);
    }
```

Saída possível:
```
    I've read 8 bytes
```

### Veja também

[ fsetpos](<#/doc/io/c/fsetpos>) | move o indicador de posição do arquivo para um local específico em um arquivo
(função)
[ fgetpos](<#/doc/io/c/fgetpos>) | obtém o indicador de posição do arquivo
(função)
[ ftell](<#/doc/io/c/ftell>) | retorna o indicador de posição atual do arquivo
(função)
[ rewind](<#/doc/io/c/rewind>) | move o indicador de posição do arquivo para o início de um arquivo
(função)
[Documentação C](<#/>) para fseek