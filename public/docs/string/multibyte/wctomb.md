# std::wctomb

Definido no cabeçalho `[<cstdlib>](<#/doc/header/cstdlib>)`

```c
int wctomb( char* s, wchar_t wc );
```

Converte um caractere largo wc para codificação multibyte e o armazena (incluindo quaisquer sequências de mudança de estado) no array de char cujo primeiro elemento é apontado por s. Não mais do que MB_CUR_MAX caracteres são armazenados. A conversão é afetada pela categoria LC_CTYPE do locale atual.

Se wc for o caractere nulo, o byte nulo é escrito em s, precedido por quaisquer sequências de mudança de estado necessárias para restaurar o estado de mudança inicial.

Se s for um ponteiro nulo, redefine o estado de conversão global e determina se sequências de mudança de estado são usadas.

### Parâmetros

- **s** — ponteiro para o array de caracteres para saída
- **wc** — caractere largo a ser convertido

### Valor de retorno

Se s não for um ponteiro nulo, retorna o número de bytes contidos na representação multibyte de wc ou -1 se wc não for um caractere válido.

Se s for um ponteiro nulo, redefine seu estado de conversão interno para representar o estado de mudança inicial e retorna 0 se a codificação multibyte atual não for dependente de estado (não usa sequências de mudança de estado) ou um valor diferente de zero se a codificação multibyte atual for dependente de estado (usa sequências de mudança de estado).

### Observações

Cada chamada a `wctomb` atualiza o estado de conversão global interno (um objeto estático do tipo [std::mbstate_t](<#/doc/string/multibyte/mbstate_t>), conhecido apenas por esta função). Se a codificação multibyte usar estados de mudança, esta função não é reentrante. Em qualquer caso, múltiplas threads não devem chamar `wctomb` sem sincronização: [std::wcrtomb](<#/doc/string/multibyte/wcrtomb>) pode ser usado em vez disso.

### Exemplo

Execute este código
```cpp
    #include <clocale>
    #include <cstdlib>
    #include <iomanip>
    #include <iostream>
    #include <string>
    
    void print_wide(const std::wstring& wstr)
    {
        bool shifts = std::wctomb(nullptr, 0); // redefine o estado de conversão
        std::cout << "shift sequences are " << (shifts ? "" : "not" )
                  << " used\n" << std::uppercase << std::setfill('0');
        for (const wchar_t wc : wstr)
        {
            std::string mb(MB_CUR_MAX, '\0');
            const int ret = std::wctomb(&mb[0], wc);
            const char* s = ret > 1 ? "s" : "";
            std::cout << "multibyte char '" << mb << "' is " << ret
                      << " byte" << s << ": " << [std::hex;
            for (int i{0}; i != ret; ++i)
            {
                const int c = 0xFF & mb[i];
                std::cout << (i ? " " : "") << std::setw(2) << c;
            }
            std::cout << "]\n" << std::dec;
        }
    }
    
    int main()
    {
        std::setlocale(LC_ALL, "en_US.utf8");
        // Codificação multibyte estreita UTF-8
        std::wstring wstr = L"z\u00df\u6c34\U0001d10b"; // or L"zß水𝄋"
        print_wide(wstr);
    }
```

Saída:
```
    shift sequences are not used
    multibyte char 'z' is 1 byte: [7A]
    multibyte char 'ß' is 2 bytes: [C3 9F]
    multibyte char '水' is 3 bytes: [E6 B0 B4]
    multibyte char '𝄋' is 4 bytes: [F0 9D 84 8B]
```

### Veja também

[ mbtowc](<#/doc/string/multibyte/mbtowc>) | converte o próximo caractere multibyte para caractere largo
(função)
[ wcrtomb](<#/doc/string/multibyte/wcrtomb>) | converte um caractere largo para sua representação multibyte, dado o estado
(função)
[ do_out](<#/doc/locale/codecvt/out>)[virtual] | converte uma string de `InternT` para `ExternT`, como ao escrever em um arquivo
(função membro virtual protegida de `std::codecvt<InternT,ExternT,StateT>`)
[documentação C](<#/>) para wctomb