# Palavra-chave C++: class

### Uso

  * [declaração de uma classe](<#/doc/language/class>)

  * [declaração de um tipo de enumeração com escopo](<#/doc/language/enum>)

| (desde C++11)  
  
  * Em uma [ declaração de template](<#/doc/language/templates>), class pode ser usada para introduzir [ parâmetros de template de tipo](<#/doc/language/template_parameters>) e [ parâmetros de template template](<#/doc/language/template_parameters>)
  * Se uma função ou variável existir no escopo com o nome idêntico ao nome de um tipo de classe, `class` pode ser prefixado ao nome para desambiguação, resultando em um [especificador de tipo elaborado](<#/doc/language/elaborated_type_specifier>)

### Exemplo

Execute este código
```cpp
    class Foo; // declaração antecipada de uma classe
     
    class Bar  // definição de uma classe
    {
    public:
        Bar(int i) : m_i(i) {}
    private:
        int m_i;
    };
     
    template<class T> // argumento de template
    void qux()
    {
        T t;
    }
     
    enum class Pub // enum com escopo, desde C++11
    {
        b, d, p, q
    };
     
    int main()
    {
        Bar Bar(1); // variável Bar oculta o tipo Bar
        Bar Bar2(2); // erro de compilador
        class Bar Bar3(3); // tipo elaborado
    }
```

### Veja também

  * [`struct`](<#/doc/keyword/struct>), [`union`](<#/doc/keyword/union>)

  * [`final`](<#/doc/identifier_with_special_meaning/final>)

| (desde C++11)  
  
  * [`enum`](<#/doc/keyword/enum>)
  * [`typename`](<#/doc/keywords/typename>)
  * [`template`](<#/doc/keyword/template>)

  * [`concept`](<#/doc/keyword/concept>), [`requires`](<#/doc/keyword/requires>)

| (desde C++20)  