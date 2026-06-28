# std::mbstowcs

Definido no cabeçalho `[<cstdlib>](<#/doc/header/cstdlib>)`

```c
std::size_t mbstowcs( wchar_t* dst, const char* src, std::size_t len );
```

Converte uma string de caracteres multibyte do array cujo primeiro elemento é apontado por src para sua representação de caracteres wide. Os caracteres convertidos são armazenados nos elementos sucessivos do array apontado por dst. Não mais do que len caracteres wide são escritos no array de destino.

Cada caractere é convertido como se por uma chamada para [std::mbtowc](<#/doc/string/multibyte/mbtowc>), exceto que o estado de conversão de mbtowc não é afetado. A conversão para se:

*   O caractere nulo multibyte foi convertido e armazenado.
*   Um caractere multibyte inválido (no locale C atual) foi encontrado.
*   O próximo caractere wide a ser armazenado excederia len.

### Observações

Na maioria das implementações, esta função atualiza um objeto estático global do tipo [std::mbstate_t](<#/doc/string/multibyte/mbstate_t>) à medida que processa a string, e não pode ser chamada simultaneamente por duas threads; [std::mbsrtowcs](<#/doc/string/multibyte/mbsrtowcs>) deve ser usada em tais casos.

POSIX especifica uma extensão comum: se dst for um ponteiro nulo, esta função retorna o número de caracteres wide que seriam escritos em dst, se convertidos. Comportamento semelhante é padrão para [std::mbsrtowcs](<#/doc/string/multibyte/mbsrtowcs>).

### Parâmetros

- **dst** — ponteiro para o array de caracteres wide onde a string wide será armazenada
- **src** — ponteiro para o primeiro elemento de uma string multibyte terminada em nulo a ser convertida
- **len** — número de caracteres wide disponíveis no array apontado por dst

### Valor de retorno

Em caso de sucesso, retorna o número de caracteres wide, excluindo o L'\0' terminador, escritos no array de destino.

Em caso de erro de conversão (se um caractere multibyte inválido for encontrado), retorna static_cast<[std::size_t](<#/doc/types/size_t>)> (-1).

### Exemplo

Execute este código
```cpp
    #include <clocale>
    #include <cstdlib>
    #include <iostream>
    
    int main()
    {
        std::setlocale(LC_ALL, "en_US.utf8");
        std::wcout.imbue(std::locale("en_US.utf8"));
        const char* mbstr = "z\u00df\u6c34\U0001f34c"; // or u8"zß水🍌"
                            // or "\x7a\xc3\x9f\xe6\xb0\xb4\xf0\x9f\x8d\x8c";
        wchar_t wstr[5];
        std::mbstowcs(wstr, mbstr, 5);
        std::wcout << "wide string: " << wstr << '\n';
    }
```

Saída:
```
    wide string: zß水🍌
```

### Veja também

[ mbsrtowcs](<#/doc/string/multibyte/mbsrtowcs>) | converte uma string de caracteres multibyte estreita para string wide, dado o estado
(função)
[ wcstombs](<#/doc/string/multibyte/wcstombs>) | converte uma string wide para string de caracteres multibyte estreita
(função)
[ do_in](<#/doc/locale/codecvt/in>)[virtual] | converte uma string de `ExternT` para `InternT`, como ao ler de um arquivo
(função membro virtual protegida de `std::codecvt<InternT,ExternT,StateT>`)
[Documentação C](<#/>) para mbstowcs