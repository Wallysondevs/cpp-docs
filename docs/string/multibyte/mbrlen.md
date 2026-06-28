# std::mbrlen

Definido no cabeçalho `[<cwchar>](<#/doc/header/cwchar>)`

```c
std::size_t mbrlen( const char* s, std::size_t n, std::mbstate_t* ps);
```

Determina o tamanho, em bytes, do restante do caractere multibyte cujo primeiro byte é apontado por `s`, dado o estado de conversão atual `ps`.

Esta função é equivalente à chamada [std::mbrtowc](<#/doc/string/multibyte/mbrtowc>)(nullptr, s, n, ps ? ps : &internal) para algum objeto oculto `internal` do tipo [std::mbstate_t](<#/doc/string/multibyte/mbstate_t>), exceto que a expressão `ps` é avaliada apenas uma vez.

### Parâmetros

- **s** — ponteiro para um elemento de uma string de caractere multibyte
- **n** — limite no número de bytes em `s` que podem ser examinados
- **ps** — ponteiro para a variável que mantém o estado de conversão

### Valor de retorno

*   `​0​` se os próximos `n` ou menos bytes completarem o caractere nulo.
*   O número de bytes (entre 1 e `n`) que completam um caractere multibyte válido.
*   [std::size_t](<#/doc/types/size_t>)(-1) se ocorrer um erro de codificação.
*   [std::size_t](<#/doc/types/size_t>)(-2) se os próximos `n` bytes fizerem parte de um caractere multibyte possivelmente válido, que ainda está incompleto após examinar todos os `n` bytes.

### Exemplo

Execute este código
```cpp
    #include <clocale>
    #include <cwchar>
    #include <iostream>
    #include <string>
    
    int main()
    {
        // allow mbrlen() to work with UTF-8 multibyte encoding
        std::setlocale(LC_ALL, "en_US.utf8");
    
        // UTF-8 narrow multibyte encoding
        std::string str = "水"; // or u8"\u6c34" or "\xe6\xb0\xb4"
        std::mbstate_t mb = std::mbstate_t();
    
        // simple use: length of a complete multibyte character
        const std::size_t len = std::mbrlen(&str[0], str.size(), &mb);
        std::cout << "The length of " << str << " is " << len << " bytes\n";
    
        // advanced use: restarting in the middle of a multibyte character
        const std::size_t len1 = std::mbrlen(&str[0], 1, &mb);
        if (len1 == std::size_t(-2))
            std::cout << "The first 1 byte of " << str
                      << " is an incomplete multibyte char (mbrlen returns -2)\n";
    
        const std::size_t len2 = std::mbrlen(&str[1], str.size() - 1, &mb);
        std::cout << "The remaining " << str.size() - 1 << " bytes of " << str
                  << " hold " << len2 << " bytes of the multibyte character\n";
    
        // error case:
        std::cout << "Attempting to call mbrlen() in the middle of " << str
                  << " while in initial shift state returns "
                  << (int)mbrlen(&str[1], str.size(), &mb) << '\n';
    }
```

Saída:
```
    The length of 水 is 3 bytes.
    The first 1 byte of 水 is an incomplete multibyte char (mbrlen returns -2)
    The remaining 2 bytes of 水 hold 2 bytes of the multibyte character
    Attempting to call mbrlen() in the middle of 水 while in initial shift state returns -1
```

### Veja também

[ mbrtowc](<#/doc/string/multibyte/mbrtowc>) | converte o próximo caractere multibyte para caractere largo, dado o estado
(função)
[ mblen](<#/doc/string/multibyte/mblen>) | retorna o número de bytes no próximo caractere multibyte
(função)
[ do_length](<#/doc/locale/codecvt/length>)[virtual] | calcula o comprimento da string `ExternT` que seria consumida pela conversão para o buffer `InternT` fornecido
(função membro virtual protegida de `std::codecvt<InternT,ExternT,StateT>`)
[C documentation](<#/>) para mbrlen