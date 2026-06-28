# std::fclose

Definido no cabeçalho `[<cstdio>](<#/doc/header/cstdio>)`

```c
int fclose( std::FILE* stream );
```

Fecha o stream de arquivo fornecido. Quaisquer dados em buffer não gravados são descarregados para o SO. Quaisquer dados em buffer não lidos são descartados.

Independentemente do sucesso da operação, o stream não está mais associado a um arquivo, e o buffer alocado por [std::setbuf](<#/doc/io/c/setbuf>) ou [std::setvbuf](<#/doc/io/c/setvbuf>), se houver, também é desassociado e desalocado se a alocação automática foi usada.

O comportamento é indefinido se o valor do ponteiro `stream` for usado após `fclose` retornar.

### Parâmetros

- **stream** — o stream de arquivo a ser fechado

### Valor de retorno

​0​ em caso de sucesso, [EOF](<#/doc/io/c>) caso contrário.

### Exemplo

Execute este código
```cpp
    #include <cstdio>
    #include <cstdlib>
    
    int main()
    {
        int is_ok = EXIT_FAILURE;
        FILE* fp = std::fopen("/tmp/test.txt", "w+");
        if (!fp)
        {
            std::perror("File opening failed");
            return is_ok;
        }
    
        int c; // Note: int, not char, required to handle EOF
        while ((c = std::fgetc(fp)) != EOF) // Standard C I/O file reading loop
            std::putchar(c);
    
        if (std::ferror(fp))
            std::puts("I/O error when reading");
        else if (std::feof(fp))
        {
            std::puts("End of file reached successfully");
            is_ok = EXIT_SUCCESS;
        }
    
        std::fclose(fp);
        return is_ok;
    }
```

Saída:
```
    End of file reached successfully
```

### Veja também

[ fopen](<#/doc/io/c/fopen>) | abre um arquivo
(função)
[ freopen](<#/doc/io/c/freopen>) | abre um stream existente com um nome diferente
(função)
[ close](<#/doc/io/basic_filebuf/close>) | descarrega o buffer da área de escrita e fecha o arquivo associado
(função membro pública de `std::basic_filebuf<CharT,Traits>`)
[Documentação C](<#/>) para fclose