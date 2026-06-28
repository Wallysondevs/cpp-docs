# std::money_get&lt;CharT,InputIt&gt;::get, do_get

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`

```c
public:
iter_type get( iter_type beg, iter_type end, bool intl, std::ios_base& str,
std::ios_base::iostate& err, long double& units ) const;
iter_type get( iter_type beg, iter_type end, bool intl, std::ios_base& str,
std::ios_base::iostate& err, string_type& digits ) const;
protected:
virtual iter_type do_get( iter_type beg, iter_type end, bool intl, std::ios_base& str,
std::ios_base::iostate& err, long double& units ) const;
virtual iter_type do_get( iter_type beg, iter_type end, bool intl, std::ios_base& str,
std::ios_base::iostate& err, string_type& digits ) const;
```

Analisa um valor monetário de um iterator de entrada e escreve o resultado em um long double ou string.

1,2) Funções membro públicas, chamam a função membro `do_get` da classe mais derivada.

3,4) Lê caracteres do iterator de entrada beg, esperando encontrar um valor monetário formatado de acordo com as regras especificadas pela facet [std::ctype](<#/doc/locale/ctype>) imbuída em str.getloc() (`ct` para o restante desta página), pela facet [std::moneypunct](<#/doc/locale/moneypunct>)<CharT, intl> imbuída em str.getloc() (`mp` para o restante desta página), e pelas flags de formatação do stream obtidas de str.flags().

Se o iterator de entrada beg se tornar igual a end antes que a análise seja concluída, define tanto failbit quanto eofbit em err. Se a análise falhar por outro motivo, define o `failbit` em err. De qualquer forma, não modifica o parâmetro de saída (units ou digits) em caso de erro.

Se a análise for bem-sucedida, não altera err e armazena o resultado em units ou digits.

O [padrão](<#/doc/locale/money_base>) de formatação usado por esta função é sempre mp.neg_format().

Se mp.grouping() não permitir separadores de milhares, o primeiro separador encontrado é tratado como um erro de análise; caso contrário, eles são tratados como opcionais.

Se money_base::space ou money_base::none for o último elemento no [padrão](<#/doc/locale/money_base>), o parser não tenta consumir nenhum espaço em branco após os outros componentes do valor monetário terem sido analisados. Caso contrário, um ou mais caracteres de espaço em branco são consumidos onde money_base::space aparece.

Se a flag `showbase` estiver definida em str.flags(), o símbolo da moeda ou a string da moeda é obrigatório; se não estiver definida, o símbolo da moeda é opcional.

Se o primeiro caractere da string retornada por mp.positive_sign() ou mp.negative_sign() for encontrado na posição money_base::sign do padrão de formatação, ele é consumido, e o restante dos caracteres dessa string são esperados e consumidos após todos os outros componentes do valor monetário. Se mp.positive_sign() e mp.negative_sign() não forem vazias, o sinal é obrigatório e deve corresponder ao primeiro caractere de uma dessas strings. Se uma dessas strings estiver vazia, o sinal é opcional (e se estiver ausente, o sinal do resultado corresponde à string que estava vazia). Se ambas as strings estiverem vazias, ou tiverem o mesmo primeiro caractere, o resultado recebe o sinal positivo. Se o parâmetro de saída for uma string (digits) e o resultado for negativo, o valor ct.widen('-') é armazenado como o primeiro caractere do resultado.

Dígitos da entrada são extraídos na ordem em que aparecem e são colocados em digits (após o alargamento por ct.widen() conforme necessário), ou em um buffer temporário `buf1`, a partir do qual o valor de units é construído como se por
```cpp
    static const char src[] = "0123456789-";
    CharT atoms[sizeof(src)];
    ct.widen(src, src + sizeof(src) - 1, atoms);
    for (int i = 0; i < n; ++i)
    buf2[i] = src[find(atoms, atoms+sizeof(src), buf1[i]) - atoms];
    buf2[n] = 0;
    sscanf(buf2, "%Lf", &units);
```
(onde `n` é o número de caracteres extraídos da entrada e armazenados em `buf1` e `buf2` é outro buffer de caracteres suficientemente grande).

### Valor de retorno

Um iterator apontando imediatamente após o último caractere reconhecido como uma parte válida da string monetária de entrada.

### Notas

As unidades monetárias são assumidas como as menores unidades não fracionárias da moeda: centavos nos EUA, ienes no Japão. Assim, a sequência de entrada "$1,056.23" em uma locale dos EUA produz o número 105623.0 em units ou uma string "105623" em digits.

Como o símbolo da moeda é opcional se `showbase` estiver desativado, mas o `negative_sign()` multicaractere inteiro é obrigatório, dado o padrão de formatação {sign, value, space, symbol} com `showbase` desativado e `negative_sign` como "-", a string "-1.23 €" é analisada como -123 e deixa "€" não consumido no stream de entrada, mas se `negative_sign` for "()", a string "(1.23 €)" é consumida completamente.

O manipulador de E/S [std::get_money](<#/doc/io/manip/get_money>) oferece uma interface mais simples para esta função.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <locale>
    #include <sstream>
    
    void demo_money_get(std::locale loc, const std::string& input)
    {
        std::istringstream str(input);
        str.imbue(loc);
        long double units;
    
        // The following can be written simpler with std::get_money(units)
        std::ios_base::iostate err = std::ios_base::goodbit;
        std::istreambuf_iterator<char> ret =
            std::use_facet<std::money_get<char>>(loc).get(
                std::istreambuf_iterator<char>(str),
                std::istreambuf_iterator<char>(),
                false, str, err, units);
        str.setstate(err);
        std::istreambuf_iterator<char> last{};
        if (str)
        {
            std::cout << "Successfully parsed '" << str.str() << "' as "
                      << units / 100 << " units\n";
            if (ret != last)
            {
                std::cout << "Remaining content: '";
                std::copy(ret, last, std::ostreambuf_iterator<char>(std::cout));
                std::cout << "'\n";
            }
            else
                std::cout << "The input was fully consumed\n";
        }
        else
        {
            std::cout << "Parse failed. Unparsed string: '";
            std::copy(ret, last, std::ostreambuf_iterator<char>(std::cout));
            std::cout << "'\n";
        }
    }
    
    int main()
    {
        demo_money_get(std::locale("en_US.utf8"), "-$5.12 abc");
        demo_money_get(std::locale("ms_MY.utf8"), "(RM5.12) def");
    }
```

Saída:
```
    Successfully parsed '-$5.12 abc' as -5.12 units
    Remaining content: ' abc'
    Successfully parsed '(RM5.12) def' as -5.12 units
    Remaining content: ' def'
```

### Ver também

[ moneypunct](<#/doc/locale/moneypunct>) | define parâmetros de formatação monetária usados por [std::money_get](<#/doc/locale/money_get>) e [std::money_put](<#/doc/locale/money_put>)
(modelo de classe)
[ money_get](<#/doc/locale/money_get>) | analisa e constrói um valor monetário a partir de uma sequência de caracteres de entrada
(modelo de classe)
[ get_money](<#/doc/io/manip/get_money>)(C++11) | analisa um valor monetário
(modelo de função)