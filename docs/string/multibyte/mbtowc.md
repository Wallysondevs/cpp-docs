# std::mbtowc

Definido no cabeçalho `[<cstdlib>](<#/doc/header/cstdlib>)`

```c
int mbtowc( wchar_t* pwc, const char* s, std::size_t n );
```

Converte um caractere multibyte cujo primeiro byte é apontado por s para um caractere largo (wide character), escrito em *pwc se pwc não for nulo.

Se s for um ponteiro nulo, redefine o estado de conversão global e determina se sequências de mudança (shift sequences) são usadas.

### Parâmetros

- **s** — ponteiro para o caractere multibyte
- **n** — limite no número de bytes em s que podem ser examinados
- **pwc** — ponteiro para o caractere largo (wide character) para saída

### Valor de retorno

Se s não for um ponteiro nulo, retorna o número de bytes contidos no caractere multibyte ou -1 se os primeiros bytes apontados por s não formarem um caractere multibyte válido ou ​0​ se s estiver apontando para o caractere nulo '\0'.

Se s for um ponteiro nulo, redefine seu estado de conversão interno para representar o estado de mudança inicial (initial shift state) e retorna ​0​ se a codificação multibyte atual não for dependente de estado (não usa sequências de mudança) ou um valor diferente de zero se a codificação multibyte atual for dependente de estado (usa sequências de mudança).

### Notas

Cada chamada a `mbtowc` atualiza o estado de conversão global interno (um objeto estático do tipo [std::mbstate_t](<#/doc/string/multibyte/mbstate_t>), conhecido apenas por esta função). Se a codificação multibyte usar estados de mudança (shift states), deve-se ter cuidado para evitar retrocessos ou múltiplas varreduras. Em qualquer caso, múltiplas threads não devem chamar `mbtowc` sem sincronização: [std::mbrtowc](<#/doc/string/multibyte/mbrtowc>) pode ser usado em vez disso.

### Exemplo

Execute este código
```cpp
    #include <clocale>
    #include <cstdlib>
    #include <cstring>
    #include <iostream>
     
    int print_mb(const char* ptr)
    {
        std::mbtowc(nullptr, 0, 0); // reset the conversion state
        const char* end = ptr + std::strlen(ptr);
        int ret{};
        for (wchar_t wc; (ret = std::mbtowc(&wc, ptr, end - ptr)) > 0; ptr += ret)
            std::wcout << wc;
        std::wcout << '\n';
        return ret;
    }
     
    int main()
    {
        std::setlocale(LC_ALL, "en_US.utf8");
        // UTF-8 narrow multibyte encoding
        const char* str = "z\u00df\u6c34\U0001d10b"; // or "zß水𝄋"
                          // or "\x7a\xc3\x9f\xe6\xb0\xb4\xf0\x9d\x84\x8b";
        print_mb(str);
    }
```

Saída:
```
    zß水𝄋
```

### Veja também

[ mbrtowc](<#/doc/string/multibyte/mbrtowc>) | converte o próximo caractere multibyte para caractere largo (wide character), dado o estado
(função)
[ mblen](<#/doc/string/multibyte/mblen>) | retorna o número de bytes no próximo caractere multibyte
(função)
[ do_in](<#/doc/locale/codecvt/in>)[virtual] | converte uma string de `ExternT` para `InternT`, como ao ler de um arquivo
(função membro virtual protegida de `std::codecvt<InternT,ExternT,StateT>`)
[Documentação C](<#/>) para mbtowc