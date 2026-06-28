# std::bitset

Definido no cabeçalho `[<bitset>](<#/doc/header/bitset>)`

```c
template< std::size_t N >
class bitset;
```

O template de classe `bitset` representa uma sequência de `N` bits de tamanho fixo. Bitsets podem ser manipulados por operadores lógicos padrão e convertidos de e para strings e inteiros. Para fins de representação em string e de nomear direções para operações de deslocamento, a sequência é considerada como tendo seus elementos de menor índice à _direita_, como na representação binária de inteiros.

`bitset` atende aos requisitos de [CopyConstructible](<#/doc/named_req/CopyConstructible>) e [CopyAssignable](<#/doc/named_req/CopyAssignable>).

```cpp
Todas as funções membro de `std::bitset` são constexpr: é possível criar e usar objetos `std::bitset` na avaliação de uma expressão constante.  // (desde C++23)
```

### Parâmetros de template

- **N** — o número de bits para alocar armazenamento

### Tipos membro

[ reference](<#/doc/utility/bitset/reference>) | classe proxy representando uma referência a um bit
(class)

### Funções membro

[ (constructor)](<#/doc/utility/bitset/bitset>) | constrói o bitset
(public member function)
[ operator==operator!=](<#/doc/utility/bitset/operator_cmp>)(removido em C++20) | compara o conteúdo
(public member function)

##### Acesso a elementos

[ operator[]](<#/doc/utility/bitset/operator_at>) | acessa um bit específico
(public member function)
[ test](<#/doc/utility/bitset/test>) | acessa um bit específico
(public member function)
[ allanynone](<#/doc/utility/bitset/all_any_none>) | verifica se todos, algum ou nenhum dos bits estão definidos como true
(public member function)
[ count](<#/doc/utility/bitset/count>) | retorna o número de bits definidos como true
(public member function)

##### Capacidade

[ size](<#/doc/utility/bitset/size>) | retorna o número de bits que o bitset contém
(public member function)

##### Modificadores

[ operator&=operator|=operator^=operator~](<#/doc/utility/bitset/operator_logic>) | realiza AND, OR, XOR e NOT binários
(public member function)
[ operator<<=operator>>=operator<&lt;operator&gt;>](<#/doc/utility/bitset/operator_ltltgtgt>) | realiza deslocamento binário para a esquerda e para a direita
(public member function)
[ set](<#/doc/utility/bitset/set>) | define bits como true ou um valor dado
(public member function)
[ reset](<#/doc/utility/bitset/reset>) | define bits como false
(public member function)
[ flip](<#/doc/utility/bitset/flip>) | inverte os valores dos bits
(public member function)

##### Conversões

[ to_string](<#/doc/utility/bitset/to_string>) | retorna uma representação em string dos dados
(public member function)
[ to_ulong](<#/doc/utility/bitset/to_ulong>) | retorna uma representação inteira unsigned long dos dados
(public member function)
[ to_ullong](<#/doc/utility/bitset/to_ullong>)(C++11) | retorna uma representação inteira unsigned long long dos dados
(public member function)

### Funções não-membro

[ operator&operator|operator^](<#/doc/utility/bitset/operator_logic2>) | realiza operações lógicas binárias em bitsets
(function template)
[ operator<&lt;operator&gt;>](<#/doc/utility/bitset/operator_ltltgtgt2>) | realiza entrada e saída de stream de bitsets
(function template)

### Classes auxiliares

[ std::hash<std::bitset>](<#/doc/utility/bitset/hash>)(C++11) | suporte a hash para `std::bitset`
(class template specialization)

### Notas

Se o tamanho de um bitset não for conhecido em tempo de compilação, ou for necessário alterar seu tamanho em tempo de execução, tipos dinâmicos como [`std::vector<bool>`](<#/doc/container/vector_bool>) ou [`boost::dynamic_bitset<>`](<https://www.boost.org/doc/libs/release/libs/dynamic_bitset/dynamic_bitset.html>) podem ser usados em vez disso.

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_constexpr_bitset`](<#/doc/feature_test>) | [`202207L`](<#/>) | (C++23) | Um `std::bitset` mais constexpr
[`__cpp_lib_bitset`](<#/doc/feature_test>) | [`202306L`](<#/>) | (C++26) | Interface de `std::bitset` com [std::string_view](<#/doc/string/basic_string_view>)

### Exemplo

Execute este código
```cpp
    #include <bitset>
    #include <cassert>
    #include <cstddef>
    #include <iostream>
    
    int main()
    {
        typedef std::size_t length_t, position_t; // as dicas
    
        // construtores:
        constexpr std::bitset<4> b1;
        constexpr std::bitset<4> b2{0xA}; // == 0B1010
        std::bitset<4> b3{"0011"}; // também pode ser constexpr desde C++23
        std::bitset<8> b4{"ABBA", length_t(4), /*0:*/'A', /*1:*/'B'}; // == 0B0000'0110
    
        // bitsets podem ser impressos em um stream:
        std::cout << "b1:" << b1 << "; b2:" << b2 << "; b3:" << b3 << "; b4:" << b4 << '\n';
    
        // bitset suporta operações bit a bit:
        b3 |= 0b0100; assert(b3 == 0b0111);
        b3 &= 0b0011; assert(b3 == 0b0011);
        b3 ^= std::bitset<4>{0b1100}; assert(b3 == 0b1111);
    
        // operações no conjunto completo:
        b3.reset(); assert(b3 == 0);
        b3.set(); assert(b3 == 0b1111);
        assert(b3.all() && b3.any() && !b3.none());
        b3.flip(); assert(b3 == 0);
    
        // operações em bits individuais:
        b3.set(position_t(1), true); assert(b3 == 0b0010);
        b3.set(position_t(1), false); assert(b3 == 0);
        b3.flip(position_t(2)); assert(b3 == 0b0100);
        b3.reset(position_t(2)); assert(b3 == 0);
    
        // o operador de subscrito [] é suportado:
        b3[2] = true; assert(true == b3[2]);
    
        // outras operações:
        assert(b3.count() == 1);
        assert(b3.size() == 4);
        assert(b3.to_ullong() == 0b0100ULL);
        assert(b3.to_string() == "0100");
    }
```

Saída:
```
    b1:0000; b2:1010; b3:0011; b4:00000110
```

### Veja também

[ vector&lt;bool&gt;](<#/doc/container/vector_bool>) | bitset dinâmico com eficiência de espaço
(class template specialization)
[**Manipulação de bits**](<#/doc/numeric>) (C++20) | utilitários para acessar, manipular e processar bits individuais e sequências de bits