# std::fread

Definido no cabeçalho `[<cstdio>](<#/doc/header/cstdio>)`

```c
std::size_t fread( void* buffer, std::size_t size, std::size_t count, std::FILE* stream );
```

Lê até `count` objetos para o array `buffer` a partir do `stream` de entrada fornecido, como se chamasse [std::fgetc](<#/doc/io/c/fgetc>) `size` vezes para cada objeto, e armazenasse os resultados, na ordem obtida, nas posições sucessivas de `buffer`, que é reinterpretado como um array de `unsigned char`. O indicador de posição do arquivo para o stream é avançado pelo número de caracteres lidos.

Se os objetos não forem [TriviallyCopyable](<#/doc/named_req/TriviallyCopyable>), o comportamento é indefinido.

Se ocorrer um erro, o valor resultante do indicador de posição do arquivo para o stream é indeterminado. Se um elemento parcial for lido, seu valor é indeterminado.

### Parâmetros

buffer | \- | ponteiro para o primeiro objeto no array a ser lido
---|---|---
size | \- | tamanho de cada objeto em bytes
count | \- | o número de objetos a serem lidos
stream | \- | stream de arquivo de entrada para ler

### Valor de retorno

Número de objetos lidos com sucesso, que pode ser menor que `count` se ocorrer um erro ou condição de fim de arquivo.

Se `size` ou `count` for zero, `fread` retorna zero e não executa nenhuma outra ação.

`fread` não distingue entre fim de arquivo e erro, e os chamadores devem usar [std::feof](<#/doc/io/c/feof>) e [std::ferror](<#/doc/io/c/ferror>) para determinar qual ocorreu.

### Exemplo

Execute este código
```cpp
    #include <cstddef>
    #include <cstdio>
    #include <fstream>
    #include <iomanip>
    #include <iostream>
    #include <vector>
    
    int main()
    {
        // Prepare file
        std::ofstream("test.txt") << 1 << ' ' << 2 << '\n';
        std::FILE* f = std::fopen("test.txt", "r");
    
        std::vector<char> buf(4); // char is trivially copyable
        const std::size_t n = std::fread(&buf[0], sizeof buf[0], buf.size(), f);
    
        std::cout << "Read " << n << " object" << (n > 1 ? "s" : "") << ": "
                  << std::hex << std::uppercase << std::setfill('0');
        for (char n : buf)
            std::cout << "0x" << std::setw(2) << static_cast<short>(n) << ' ';
        std::cout << '\n';
    
        std::vector<std::string> buf2; // string is not trivially copyable
    //  This would result in undefined behavior:
    //  std::fread(&buf2[0], sizeof buf2[0], buf2.size(), f);
    }
```

Saída possível:
```
    Read 4 objects: 0x31 0x20 0x32 0x0A
```

### Veja também

[ scanf](<#/doc/io/c/scanf>) | lê entrada formatada de [stdin](<#/doc/io/c/std_streams>), um stream de arquivo ou um buffer
(função)
[ fgets](<#/doc/io/c/fgets>) | obtém uma string de caracteres de um stream de arquivo
(função)
[ fwrite](<#/doc/io/c/fwrite>) | escreve em um arquivo
(função)
[C documentation](<#/>) para fread