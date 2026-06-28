# std::numpunct&lt;CharT&gt;::grouping, std::numpunct&lt;CharT&gt;::do_grouping

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`

```c
public:
std::string grouping() const;
protected:
virtual std::string do_grouping() const;
```

1) Função membro pública, chama a função membro `do_grouping` da classe mais derivada.

2) Retorna uma [std::string](<#/doc/string/basic_string>) contendo, em cada elemento char, o número de dígitos em cada grupo da saída numérica formatada por [`num_put::put()`](<#/doc/locale/num_put/put>) (e, portanto, [`basic_ostream::operator<<`](<#/doc/io/basic_ostream/operator_ltlt>)).

Esta função retorna uma string, vec, que é usada como um vetor de valores inteiros. (Por exemplo, "\003" especifica grupos de 3 dígitos cada, enquanto "3" implica grupos de 51 dígitos cada.). Cada elemento vec[i] representa o número de dígitos no `i`-ésimo grupo de dígitos da parte inteira do número, contando da direita: vec[0] contém o número de dígitos no grupo mais à direita, vec[1] - no segundo grupo da direita, etc. O agrupamento indicado pelo último caractere, vec[vec.size()-1], é repetidamente reutilizado para agrupar todos os dígitos restantes na (parte esquerda do) número. Se vec[i] for não-positivo ou igual a [CHAR_MAX](<#/doc/types/climits>), o tamanho do grupo de dígitos correspondente é ilimitado.

### Valor de retorno

O objeto do tipo [std::string](<#/doc/string/basic_string>) contendo os grupos. As especializações padrão de `std::numpunct` retornam uma string vazia, indicando nenhum agrupamento. Agrupamentos típicos (por exemplo, a locale `en_US`) retornam "\003".

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <limits>
    #include <locale>
    
    struct space_out : std::numpunct<char>
    {
        char do_thousands_sep()   const { return ' ';  } // separate with spaces
        std::string do_grouping() const { return "\1"; } // groups of 1 digit
    };
    
    struct g123 : std::numpunct<char>
    {
        std::string do_grouping() const { return "\1\2\3"; }
    };
    
    int main()
    {
        std::cout << "Default locale: " << 12345678 << '\n';
        std::cout.imbue(std::locale(std::cout.getloc(), new space_out));
        std::cout << "Locale with modified numpunct: " << 12345678 << '\n';
        std::cout.imbue(std::locale(std::cout.getloc(), new g123));
        std::cout << "Locale with \\1\\2\\3 grouping: "
                  << std::numeric_limits<unsigned long long>::max() << '\n'
                  << "Same, for a floating-point number: "
                  << std::fixed << 123456789.123456789 << '\n';
    }
```

Saída:
```
    Default locale: 12345678
    Locale with modified numpunct: 1 2 3 4 5 6 7 8
    Locale with \1\2\3 grouping: 18,446,744,073,709,551,61,5
    Same, for a floating-point number: 123,456,78,9.123457
```

### Veja também

[ do_thousands_sep](<#/doc/locale/numpunct/thousands_sep>)[virtual] | fornece o caractere a ser usado como separador de milhares
(função membro virtual protegida)