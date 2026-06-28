# std::num_put&lt;CharT,OutputIt&gt;::put, std::num_put&lt;CharT,OutputIt&gt;::do_put

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`

```c
public:
iter_type put( iter_type out, std::ios_base& str,
char_type fill, bool val ) const;
iter_type put( iter_type out, std::ios_base& str,
char_type fill, long val ) const;
iter_type put( iter_type out, std::ios_base& str,
char_type fill, long long val ) const;
iter_type put( iter_type out, std::ios_base& str,
char_type fill, unsigned long val ) const;
iter_type put( iter_type out, std::ios_base& str,
char_type fill, unsigned long long val ) const;
iter_type put( iter_type out, std::ios_base& str,
char_type fill, double val ) const;
iter_type put( iter_type out, std::ios_base& str,
char_type fill, long double val ) const;
iter_type put( iter_type out, std::ios_base& str,
char_type fill, const void* val ) const;
protected:
virtual iter_type do_put( iter_type out, std::ios_base& str,
char_type fill, bool val ) const;
virtual iter_type do_put( iter_type out, std::ios_base& str,
char_type fill, long val ) const;
virtual iter_type do_put( iter_type out, std::ios_base& str,
char_type fill, long long val ) const;
virtual iter_type do_put( iter_type out, std::ios_base& str,
char_type fill, unsigned long val ) const;
virtual iter_type do_put( iter_type out, std::ios_base& str,
char_type fill, unsigned long long val ) const;
virtual iter_type do_put( iter_type out, std::ios_base& str,
char_type fill, double val ) const;
virtual iter_type do_put( iter_type out, std::ios_base& str,
char_type fill, long double val ) const;
virtual iter_type do_put( iter_type out, std::ios_base& str,
char_type fill, const void* val ) const;
```

1) Função membro pública, chama a função membro virtual protegida `do_put` da classe mais derivada.

2) Escreve caracteres na sequência de saída `out` que representam o valor de `val`, formatado conforme solicitado pelas flags de formatação `str.flags()` e pelas facets `std::numpunct` e `std::ctype` do locale imbuído no stream `str`. Esta função é chamada por todos os operadores de stream de saída formatada, como `std::cout << n;`.

A conversão ocorre em quatro estágios:

#### Estágio 1: seleção do especificador de conversão

*   As flags de formato de E/S são obtidas, como se por

    ```cpp
    fmtflags basefield = (str.flags() & std::ios_base::basefield);
    fmtflags uppercase = (str.flags() & std::ios_base::uppercase);
    fmtflags floatfield = (str.flags() & std::ios_base::floatfield);
    fmtflags showpos = (str.flags() & std::ios_base::showpos);
    fmtflags showbase = (str.flags() & std::ios_base::showbase);
    fmtflags showpoint = (str.flags() & std::ios_base::showpoint);
    ```

*   Se o tipo de `val` for `bool`:
    *   Se `boolalpha == 0`, então converte `val` para o tipo `int` e realiza a saída de inteiro.
    *   Se `boolalpha != 0`, obtém `std::use_facet<std::numpunct<CharT>>(str.getloc()).truename()` se `val == true` ou `std::use_facet<std::numpunct<CharT>>(str.getloc()).falsename()` se `val == false`, e envia cada caractere sucessivo `c` dessa string para `out` com `*out++ = c`. Nenhum processamento adicional é feito neste caso, a função retorna `out`.
*   Se o tipo de `val` for um tipo inteiro, a primeira escolha aplicável das seguintes é selecionada:
    *   Se `basefield == oct`, usará o especificador de conversão `%o`
    *   Se `basefield == hex && !uppercase`, usará o especificador de conversão `%x`
    *   Se `basefield == hex`, usará o especificador de conversão `%X`
    *   Se o tipo de `val` for assinado, usará o especificador de conversão `%d`
    *   Se o tipo de `val` for não assinado, usará o especificador de conversão `%u`
*   Para tipos inteiros, o modificador de comprimento é adicionado à especificação de conversão, se necessário: `l` para `long` e `unsigned long`, `ll` para `long long` e `unsigned long long` (desde C++11).
*   Se o tipo de `val` for um tipo de ponto flutuante, a primeira escolha aplicável das seguintes é selecionada:
    *   Se `floatfield == std::ios_base::fixed`, usará o especificador de conversão `%f`
    *   Se `floatfield == std::ios_base::scientific && !uppercase`, usará o especificador de conversão `%e`
    *   Se `floatfield == std::ios_base::scientific`, usará o especificador de conversão `%E`

    *   Se `floatfield == (std::ios_base::fixed | std::ios_base::scientific) && !uppercase`, usará o especificador de conversão `%a`
---|---
    *   Se `floatfield == (std::ios_base::fixed | std::ios_base::scientific)`, usará o especificador de conversão `%A`

| (desde C++11)

    *   Se `!uppercase`, usará o especificador de conversão `%g`
    *   Caso contrário, usará o especificador de conversão `%G`

    Também:

*   Se o tipo de `val` for `long double`, o modificador de comprimento `L` é adicionado ao especificador de conversão.
*   Se o tipo de `val` for um tipo de ponto flutuante e `floatfield != (ios_base::fixed | ios_base::scientific)` (desde C++11), o modificador de precisão é adicionado e definido para `str.precision()`. Caso contrário, nenhuma precisão é especificada.

*   Para tipos inteiros e de ponto flutuante, se `showpos` estiver definido, o modificador `+` é prefixado.
*   Para tipos inteiros, se `showbase` estiver definido, o modificador `#` é prefixado.
*   Para tipos de ponto flutuante, se `showpoint` estiver definido, o modificador `#` é prefixado.
*   Se o tipo de `val` for `void*`, usará o especificador de conversão `%p`.
*   Uma string de caracteres estreitos é criada como se por uma chamada a `std::printf(spec, val)` no locale "C", onde `spec` é o especificador de conversão escolhido.

#### Estágio 2: conversão específica do locale

*   Cada caractere `c` obtido no Estágio 1, exceto o ponto decimal '.', é convertido para `CharT` chamando `std::use_facet<std::ctype<CharT>>(str.getloc()).widen(c)`.
*   Para tipos aritméticos, o caractere separador de milhares, obtido de `std::use_facet<std::numpunct<CharT>>(str.getloc()).thousands_sep()`, é inserido na sequência de acordo com as regras de agrupamento fornecidas por `std::use_facet<std::numpunct<CharT>>(str.getloc()).grouping()`.
*   Caracteres de ponto decimal ('.') são substituídos por `std::use_facet<std::numpunct<CharT>>(str.getloc()).decimal_point()`.

#### Estágio 3: preenchimento

*   A flag de ajuste é obtida como se por `std::fmtflags adjustfield = (flags & (std::ios_base::adjustfield))` e examinada para identificar a localização do preenchimento, como segue:
    *   Se `adjustfield == std::ios_base::left`, preencherá depois.
    *   Se `adjustfield == std::ios_base::right`, preencherá antes.
    *   Se `adjustfield == std::ios_base::internal` e um caractere de sinal ocorrer na representação, preencherá depois do sinal.
    *   Se `adjustfield == std::ios_base::internal` e a representação do Estágio 1 começou com `0x` ou `0X`, preencherá depois do `x` ou `X`.
    *   Caso contrário, preencherá antes.
*   Se `str.width()` for diferente de zero (por exemplo, `std::setw` acabou de ser usado) e o número de `CharT`s após o Estágio 2 for menor que `str.width()`, então cópias do caractere de preenchimento são inseridas na posição indicada pelo preenchimento para levar o comprimento da sequência a `str.width()`.

Em qualquer caso, `str.width(0)` é chamado para cancelar os efeitos de `std::setw`.

#### Estágio 4: saída

Cada caractere sucessivo `c` da sequência de `CharT`s do Estágio 3 é enviado como se por `*out++ = c`.

### Parâmetros

- **out** — iterator apontando para o primeiro caractere a ser sobrescrito
- **str** — stream para recuperar as informações de formatação
- **fill** — caractere de preenchimento usado quando os resultados precisam ser preenchidos para a largura do campo
- **val** — valor a ser convertido para string e enviado

### Valor de retorno

`out`

### Notas

O zero à esquerda gerado pela especificação de conversão `#o` (resultante da combinação de `std::showbase` e `std::oct`, por exemplo) não é contado como um caractere de preenchimento.

Ao formatar um valor de ponto flutuante como `hexfloat` (ou seja, quando `floatfield == (std::ios_base::fixed | std::ios_base::scientific)`), a precisão do stream não é usada; em vez disso, o número é sempre impresso com precisão suficiente para representar o valor exatamente. | (desde C++11)

### Exemplo

Envia um número usando a facet diretamente e demonstra uma facet definida pelo usuário:

Execute este código
```cpp
    #include <iostream>
    #include <locale>
     
    // this custom num_put outputs squares of all integers (except long long)
    struct squaring_num_put : std::num_put<char>
    {
        iter_type do_put(iter_type out, std::ios_base& str,
                         char_type fill, long val) const
        {
            return std::num_put<char>::do_put(out, str, fill, val * val);
        }
     
        iter_type do_put(iter_type out, std::ios_base& str,
                         char_type fill, unsigned long val) const
        {
            return std::num_put<char>::do_put(out, str, fill, val * val);
        }
    };
     
    int main()
    {
        auto& facet = std::use_facet<std::num_put<char>>(std::locale());
        facet.put(std::cout, std::cout, '0', 2.71);
        std::cout << '\n';
     
        std::cout.imbue(std::locale(std::cout.getloc(), new squaring_num_put));
        std::cout << 6 << ' ' << -12 << '\n';
    }
```

Saída:
```
    2.71
    36 144
```

Uma implementação de `operator<<` para um tipo definido pelo usuário.

Execute este código
```cpp
    #include <iostream>
    #include <iterator>
    #include <locale>
     
    struct base { long x = 10; };
     
    template<class CharT, class Traits>
    std::basic_ostream<CharT, Traits>&
        operator<<(std::basic_ostream<CharT, Traits>& os, base const& b)
    {
        try
        {
            typename std::basic_ostream<CharT, Traits>::sentry s(os);
     
            if (s)
            {
                std::ostreambuf_iterator<CharT, Traits> it(os);
                std::use_facet<std::num_put<CharT>>(os.getloc())
                    .put(it, os, os.fill(), b.x);
            }
        }
        catch (...)
        {
            // set badbit on os and rethrow if required
        }
     
        return os;
    }
     
    int main()
    {
        base b;
        std::cout << b;
    }
```

Saída:
```
    10
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 34](<https://cplusplus.github.io/LWG/issue34>) | C++98 | a sobrecarga `bool` usava membros inexistentes `truename` e `falsename` de `std::ctype` | usa esses membros de `std::numpunct`
[LWG 231](<https://cplusplus.github.io/LWG/issue231>) | C++98 | o modificador de precisão era adicionado apenas se `(flags & fixed) != 0` ou `str.precision() > 0` | removeu essas condições
[LWG 282](<https://cplusplus.github.io/LWG/issue282>) | C++98 | os separadores de milhares eram inseridos apenas para tipos inteiros no estágio 2 | também inseridos para tipos de ponto flutuante

### Ver também

[ operator<<](<#/doc/io/basic_ostream/operator_ltlt>) | insere dados formatados
(função membro pública de `std::basic_ostream<CharT,Traits>`)