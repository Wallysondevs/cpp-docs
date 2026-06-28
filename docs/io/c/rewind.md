# std::rewind

Definido no cabeçalho `[<cstdio>](<#/doc/header/cstdio>)`

```c
void rewind( std::FILE* stream );
```

Move o indicador de posição do arquivo para o início do stream de arquivo fornecido.

A função é equivalente a [std::fseek](<#/doc/io/c/fseek>)(stream, 0, [SEEK_SET](<#/doc/io/c>));, exceto que os indicadores de fim de arquivo e de erro são limpos.

A função descarta quaisquer efeitos de chamadas anteriores a [ungetc](<#/doc/io/c/ungetc>).

### Parâmetros

- **stream** — stream de arquivo a ser modificado

### Valor de retorno

(nenhum)

### Exemplo

Execute este código
```cpp
    #include <array>
    #include <cstdio>
    
    int main()
    {
        std::FILE* f = std::fopen("file.txt", "w");
        for (char ch = '0'; ch <= '9'; ch++)
            std::fputc(ch, f);
        std::fclose(f);
    
        std::array<char, 20> str;
        std::FILE* f2 = std::fopen("file.txt", "r");
    
        const unsigned size1 = std::fread(str.data(), 1, str.size(), f2);
        std::puts(str.data());
        std::printf("size1 = %u\n", size1);
    
        std::rewind(f2);
    
        const unsigned size2 = std::fread(str.data(), 1, str.size(), f2);
        std::puts(str.data());
        std::printf("size2 = %u", size2);
    
        std::fclose(f2);
    }
```

Saída:
```
    0123456789
    size1 = 10
    0123456789
    size2 = 10
```

### Ver também

[ fseek](<#/doc/io/c/fseek>) | move o indicador de posição do arquivo para um local específico em um arquivo
(função)
[C documentation](<#/>) for rewind