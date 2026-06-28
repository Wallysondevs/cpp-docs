# std::fwrite

Definido no cabeçalho `[<cstdio>](<#/doc/header/cstdio>)`

```c
std::size_t fwrite( const void* buffer, std::size_t size, std::size_t count, std::FILE* stream );
```

Escreve até count objetos binários do array buffer fornecido para o stream de saída stream. Os objetos são escritos como se cada objeto fosse reinterpretado como um array de unsigned char e chamando [std::fputc](<#/doc/io/c/fputc>) size vezes para cada objeto para escrever esses unsigned chars no stream, em ordem. O indicador de posição do arquivo para o stream é avançado pelo número de caracteres escritos.

Se os objetos não forem [TriviallyCopyable](<#/doc/named_req/TriviallyCopyable>), o comportamento é indefinido.

Se ocorrer um erro, o valor resultante do indicador de posição do arquivo para o stream é indeterminado.

### Parâmetros

- **buffer** — ponteiro para o primeiro objeto no array a ser escrito
- **size** — tamanho de cada objeto
- **count** — o número de objetos a serem escritos
- **stream** — stream de arquivo de saída para escrever

### Valor de retorno

Número de objetos escritos com sucesso, que pode ser menor que count se um erro ocorreu.

Se size ou count for zero, `fwrite` retorna zero e não executa nenhuma outra ação.

### Exemplo

Execute este código
```
    #include <array>
    #include <cstdio>
    #include <vector>
     
    int main ()
    {
        // write buffer to file
        if (std::FILE* f1 = std::fopen("file.bin", "wb"))
        {
            std::array<int, 3> v = {42, -1, 7}; // underlying storage of std::array is an array
            std::fwrite(v.data(), sizeof v[0], v.size(), f1);
            std::fclose(f1);
        }
     
        // read the same data and print it to the standard output
        if (std::FILE* f2 = std::fopen("file.bin", "rb"))
        {
            std::vector<int> rbuf(10); // underlying storage of std::vector is also an array
            std::size_t sz = std::fread(rbuf.data(), sizeof rbuf[0], rbuf.size(), f2);
            std::fclose(f2);
            for (std::size_t n = 0; n < sz; ++n)
                std::printf("%d\n", rbuf[n]);
        }
    }
```

Saída:
```
    42
    -1
    7
```

### Veja também

[ printffprintfsprintfsnprintf](<#/doc/io/c/printf>)(C++11) | imprime saída formatada para [stdout](<#/doc/io/c/std_streams>), um stream de arquivo ou um buffer
(função)
[ fputs](<#/doc/io/c/fputs>) | escreve uma string de caracteres em um stream de arquivo
(função)
[ fread](<#/doc/io/c/fread>) | lê de um arquivo
(função)
[Documentação C](<#/>) para fwrite