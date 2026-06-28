# std::mblen

Definido no cabeçalho `[<cstdlib>](<#/doc/header/cstdlib>)`

```c
int mblen( const char* s, std::size_t n );
```

Determina o tamanho, em bytes, do caractere multibyte cujo primeiro byte é apontado por s.

Se s for um ponteiro nulo, redefine o estado de conversão global e determina se sequências de mudança (shift sequences) são usadas.

Esta função é equivalente à chamada [std::mbtowc](<#/doc/string/multibyte/mbtowc>)(nullptr, s, n), exceto que o estado de conversão de [std::mbtowc](<#/doc/string/multibyte/mbtowc>) não é afetado.

### Notas

Cada chamada a `mblen` atualiza o estado de conversão global interno (um objeto estático do tipo [std::mbstate_t](<#/doc/string/multibyte/mbstate_t>), conhecido apenas por esta função). Se a codificação multibyte usar estados de mudança (shift states), deve-se ter cuidado para evitar retrocessos ou múltiplas varreduras. Em qualquer caso, múltiplas threads não devem chamar `mblen` sem sincronização: [std::mbrlen](<#/doc/string/multibyte/mbrlen>) pode ser usada em vez disso.

### Parâmetros

- **s** — ponteiro para o caractere multibyte
- **n** — limite no número de bytes em s que podem ser examinados

### Valor de retorno

Se s não for um ponteiro nulo, retorna o número de bytes contidos no caractere multibyte ou -1 se os primeiros bytes apontados por s não formarem um caractere multibyte válido ou ​0​ se s estiver apontando para o caractere nulo '\0'.

Se s for um ponteiro nulo, redefine seu estado de conversão interno para representar o estado de mudança inicial (initial shift state) e retorna ​0​ se a codificação multibyte atual não for dependente de estado (não usa sequências de mudança) ou um valor diferente de zero se a codificação multibyte atual for dependente de estado (usa sequências de mudança).

### Exemplo

Execute este código
```
    #include <clocale>
    #include <cstdlib>
    #include <iomanip>
    #include <iostream>
    #include <stdexcept>
    #include <string_view>
    
    // the number of characters in a multibyte string is the sum of mblen()'s
    // note: the simpler approach is std::mbstowcs(nullptr, s.c_str(), s.size())
    std::size_t strlen_mb(const std::string_view s)
    {
        std::mblen(nullptr, 0); // reset the conversion state
        std::size_t result = 0;
        const char* ptr = s.data();
        for (const char* const end = ptr + s.size(); ptr < end; ++result)
        {
            const int next = std::mblen(ptr, end - ptr);
            if (next == -1)
                throw std::runtime_error("strlen_mb(): conversion error");
            ptr += next;
        }
        return result;
    }
    
    void dump_bytes(const std::string_view str)
    {
        std::cout << std::hex << std::uppercase << std::setfill('0');
        for (unsigned char c : str)
            std::cout << std::setw(2) << static_cast<int>(c) << ' ';
        std::cout << std::dec << '\n';
    }
    
    int main()
    {
        // allow mblen() to work with UTF-8 multibyte encoding
        std::setlocale(LC_ALL, "en_US.utf8");
        // UTF-8 narrow multibyte encoding
        const std::string_view str = "z\u00df\u6c34\U0001f34c"; // or u8"zß水🍌"
        std::cout << std::quoted(str) << " is " << strlen_mb(str)
                  << " characters, but as much as " << str.size() << " bytes: ";
        dump_bytes(str);
    }
```

Saída possível:
```
    "zß水🍌" is 4 characters, but as much as 10 bytes: 7A C3 9F E6 B0 B4 F0 9F 8D 8C
```

### Veja também

[ mbtowc](<#/doc/string/multibyte/mbtowc>) | converte o próximo caractere multibyte para caractere largo
(função)
[ mbrlen](<#/doc/string/multibyte/mbrlen>) | retorna o número de bytes no próximo caractere multibyte, dado o estado
(função)
[Documentação C](<#/>) para mblen